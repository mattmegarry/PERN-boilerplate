"use strict";

import { User } from "./User.model";
import { hashSaltPassword } from "../../utils/auth";

export const createUser = async (req, res, next) => {
  const { email, password } = req.body;
  // TO DO: SKIPPING INPUT VALIDATION - JUST PROTOTYPING!

  try {
    const passwordDigest = await hashSaltPassword(password);
    await User.create(email, passwordDigest);
    res.locals.data = {
      message:
        "Success! Please check your email and click the verification link."
    };
  } catch (err) {
    console.log(err);
    res.locals.data = { message: "Something went wrong." };
  }
  next();
};
