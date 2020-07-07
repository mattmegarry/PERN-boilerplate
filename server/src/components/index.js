"use strict";

import express from "express";
const apiRouter = express.Router();

import userRouter from "./User";
import authRouter from "./Auth";

apiRouter.use("/users", userRouter);
apiRouter.use("/auth", authRouter);

export default apiRouter;
