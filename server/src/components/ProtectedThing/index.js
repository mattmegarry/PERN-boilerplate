"use strict";

import express from "express";
const protectedThingRouter = express.Router();

import send from "../../utils/send";
import { protect } from "../../utils/auth";
import {
  createAndGetMany,
  getMany,
  updateOne
} from "./protectedThing.controller";

protectedThingRouter.post("/create", protect, createAndGetMany, send);
protectedThingRouter.get("/", protect, getMany, send);
protectedThingRouter.post("/update", protect, updateOne, send);

export default protectedThingRouter;
