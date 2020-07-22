"use strict";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import Respond from "./responses";

export const hashSaltPassword = plaintextPassword => {
  return bcrypt.hash(plaintextPassword, 12);
};

export const passwordMatches = (plaintextPassword, passwordDigest) => {
  return bcrypt.compare(plaintextPassword, passwordDigest);
};

export const issueJWTForCookie = async email => {
  let token = jwt.sign({ email: email }, process.env.JWT_COOKIE_SECRET, {
    expiresIn: "7h"
  });
  return token;
};

export const issueJWTForLocalStorage = async email => {
  let token = jwt.sign({ email: email }, process.env.JWT_LOCAL_STORAGE_SECRET, {
    expiresIn: "7h"
  });
  return token;
};

export const cookieConfig = () => {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production" ? true : false
  };
};

export const localStorageJwtVerified = async req => {
  const authHeader = req.headers["authorization"];

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return false;
  }

  let token = authHeader.slice(7, authHeader.length).trim();

  if (token) {
    jwt.verify(token, process.env.JWT_LOCAL_STORAGE_SECRET, (err, decoded) => {
      if (err) {
        return false;
      } else {
        req.decodedLocalStorage = decoded;
        return true;
      }
    });
  } else {
    return false;
  }
};

export const cookieJwtVerified = async req => {
  let token = req.cookies.auth;

  if (token) {
    jwt.verify(token, process.env.JWT_COOKIE_SECRET, (err, decoded) => {
      if (err) {
        return false;
      } else {
        req.decodedCookie = decoded;
        return true;
      }
    });
  } else {
    return false;
  }
};

export const protect = async (req, res, next) => {
  try {
    const cookieJwtVerified = await cookieJwtVerified(req);
    const localStorageJwtVerified = await localStorageJwtVerified(req);

    if (cookieJwtVerified && localStorageJwtVerified) {
      next();
    } else {
      Respond.accessDenied();
    }
  } catch (err) {
    console.log(err);
  }
};
