"use strict";

import { User } from "../User/User.model";

import {
  passwordMatches,
  issueJWTForCookie,
  issueJWTForLocalStorage
} from "../../utils/auth";

export const login = async (req, res, next) => {
  const { email, password } = req.body;
  // TO DO: SKIPPING INPUT VALIDATION - JUST PROTOTYPING!

  try {
    const user = await User.findOneByEmail(email);
    const rejectionResponse = {
      status: 401,
      data: {
        message: "Username password combination doesn't match"
      }
    };

    if (user) {
      const { passwordDigest, emailVerified } = user;

      const passwordIsCorrect = await passwordMatches(password, passwordDigest);

      if (!emailVerified) {
        res.locals = {
          status: 401,
          data: { message: "Please verify your email address" }
        };
        next();
      }

      if (user && passwordIsCorrect) {
        const jwtForCookie = await issueJWTForCookie(user.email);
        const jwtForLocalStorage = await issueJWTForLocalStorage(user.email);

        res.locals = {
          data: {
            email: user.email,
            message: "Login success",
            token: jwtForLocalStorage
          },
          status: 200,
          authCookie: {
            name: "auth",
            value: jwtForCookie
          }
        };
      } else {
        res.locals = rejectionResponse;
        next();
      }
    } else {
      res.locals = rejectionResponse;
      next();
    }
  } catch (err) {
    console.log(err);
    res.locals.data = { message: "Something went wrong." };
  }
  next();
};

export const signout = async (req, res, next) => {
  res.locals = {
    data: {
      message: "Signout success",
      token: "remove"
    },
    status: 200,
    authCookie: {
      name: "auth",
      value: "remove"
    }
  };

  return next();
};
