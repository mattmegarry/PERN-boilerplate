"use strict";

import moment from "moment";
import { v4 as uuidv4 } from "uuid";
import db from "../../db";

const create = async (userId, text) => {
  const query = `INSERT into protected_things VALUES($1, $2, $3, $4, $5) RETURNING *`;

  const values = [
    uuidv4(),
    text,
    userId,
    moment(new Date()),
    moment(new Date())
  ];

  try {
    const protectedThing = await db.queryReturningOne(query, values);
    return protectedThing;
  } catch (err) {
    console.error(err);
  }
};

export const ProtectedThing = {
  create
};
