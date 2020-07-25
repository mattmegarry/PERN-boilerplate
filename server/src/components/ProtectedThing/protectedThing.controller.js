"use strict";

import { ProtectedThing } from "./ProtectedThing.model";
import Respond from "../../utils/responses";

export const getMany = async (req, res, next) => {
  const userId = req.trustedUserId;

  try {
    const protectedThings = await ProtectedThing.getManyByUserId(userId);
    res.locals = Respond.success(protectedThings);
  } catch (err) {
    console.log(err);
    res.locals = Respond.opaqueError();
  }
  next();
};

export const createAndGetMany = async (req, res, next) => {
  const userId = req.trustedUserId;
  const { text } = req.body;

  try {
    if (text) {
      await ProtectedThing.create(userId, text);
    }
    const protectedThings = await ProtectedThing.getManyByUserId(userId);
    res.locals = Respond.success(protectedThings);
  } catch (err) {
    console.log(err);
    res.locals = Respond.opaqueError();
  }
  next();
};
