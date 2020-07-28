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

const getManyByUserId = async userId => {
  const query = `SELECT * FROM protected_things WHERE user_id = $1 ORDER BY created_at DESC`;

  const values = [userId];

  try {
    const protectedThings = await db.queryReturningMany(query, values);
    return protectedThings;
  } catch (err) {
    console.error(err);
  }
};

const update = async (id, userId, text) => {
  const query = `
  UPDATE protected_things SET text = $1, updated_at = $2 WHERE id = $3 AND user_id = $4 RETURNING *
  `;

  const values = [text, moment(new Date()), id, userId];

  try {
    const protectedThing = await db.queryReturningOne(query, values);
    return protectedThing;
  } catch (err) {
    console.error(err);
  }
};

export const ProtectedThing = {
  create,
  getManyByUserId,
  update
};
