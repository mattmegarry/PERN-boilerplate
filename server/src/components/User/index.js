"use strict";

import express from "express";
const userRouter = express.Router();

import { createUser } from "./user.controller.js";

import send from "../../utils/send";

userRouter.post("/create", createUser, send);
userRouter.get(
  "/cookie",
  (req, res, next) => {
    res.locals.status = 200;
    next();
  },
  send
);

export default userRouter;
