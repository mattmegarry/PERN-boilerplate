"use strict";

import express from "express";
const apiRouter = express.Router();

import userRouter from "./User";

apiRouter.use("/users", userRouter);

export default apiRouter;
