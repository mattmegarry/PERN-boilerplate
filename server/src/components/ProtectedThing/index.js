"use strict";

import express from "express";
const protectedThingRouter = express.Router();

import send from "../../utils/send";
import { protect } from "../../utils/auth";
import { createAndGetMany, getMany } from "./protectedThing.controller";

protectedThingRouter.post("/create", protect, createAndGetMany, send);
protectedThingRouter.get("/", protect, getMany, send);

export default protectedThingRouter;
