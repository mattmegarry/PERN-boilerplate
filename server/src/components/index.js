"use strict";

import express from "express";
const apiRouter = express.Router();

import userRouter from "./User";
import authRouter from "./Auth";
import protectedThingRouter from "./ProtectedThing";

apiRouter.use("/users", userRouter);
apiRouter.use("/users/auth", authRouter);
apiRouter.use("/protected-things", protectedThingRouter);

export default apiRouter;
