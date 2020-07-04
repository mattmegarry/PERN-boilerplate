"use strict";

export const createUser = async (req, res, next) => {
  res.locals.data = "Let's create a user!";
  next();
};
