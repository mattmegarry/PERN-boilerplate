"use strict";

import express from "express";
const protectedThingRouter = express.Router();

import send from "../../utils/send";
import { protect } from "../../utils/auth";
import { getMany } from "./protectedThing.controller";

protectedThingRouter.get("/", protect, getMany, send);

export default protectedThingRouter;
