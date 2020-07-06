"use strict";

import moment from "moment";
import { v4 as uuidv4 } from "uuid";
import db from "../../db";

const create = async (email, passwordHash) => {
  const query = `INSERT INTO
  users(id, email, password_hash, created_at, updated_at)
  VALUES($1, $2, $3, $4, $5)
  returning id`;

  const values = [
    uuidv4(),
    email,
    passwordHash,
    moment(new Date()),
    moment(new Date())
  ];

  try {
    const user = await db.queryReturningOne(query, values);
    return user;
  } catch (err) {
    console.error(err);
  }
};

export const User = {
  create: create
};
