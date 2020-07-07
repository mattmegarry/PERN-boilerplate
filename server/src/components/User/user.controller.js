"use strict";

import { User } from "./User.model";
import { hashSaltPassword } from "../../utils/auth";

export const createUser = async (req, res, next) => {
  const { email, password } = req.body;
  // TO DO: SKIPPING INPUT VALIDATION - JUST PROTOTYPING!

  try {
    const hashedPassword = await hashSaltPassword(password);
    await User.create(email, hashedPassword);
    res.locals.data = {
      message:
        "Success! Please check your email and click the verification link."
    };
  } catch (e) {
    console.log(e);
    res.locals.data = { message: "Something went wrong." };
  }
  next();
};
