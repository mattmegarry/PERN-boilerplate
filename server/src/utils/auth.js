"use strict";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const hashSaltPassword = plaintextPassword => {
  return bcrypt.hash(plaintextPassword, 12);
};

export const passwordMatches = (plaintextPassword, passwordDigest) => {
  return bcrypt.compare(plaintextPassword, passwordDigest);
};

export const issueJWTForCookie = async userId => {
  let token = jwt.sign({ userId: userId }, process.env.JWT_COOKIE_SECRET, {
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
