"use strict";

import { User } from "./User.model";
import { hashSaltPassword } from "../../utils/auth";

export const createUser = async (req, res, next) => {
  const { email, password } = req.body;
  console.log(email, password);
  // SKIPPING INPUT VALIDATION - JUST PROTOTYPING!

  try {
    const hashedPassword = await hashSaltPassword(password);
    const user = await User.create(email, hashedPassword);
    res.locals.data = user;
  } catch (e) {
    console.log(e);
    res.locals.data = { message: "Something went wrong" };
  }
  next();
};
