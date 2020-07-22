"use strict";

import express from "express";
const userRouter = express.Router();

import { login } from "./auth.controller.js";

import send from "../../utils/send";

userRouter.post("/login", login, send);

export default userRouter;
