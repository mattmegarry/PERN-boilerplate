"use strict";

import db from "./index";
import asyncForEach from "../utils/asyncForEach";
import * as seedData from "./seedData.json";
import { User } from "../components/User/User.model";
import { ProtectedThing } from "../components/ProtectedThing/ProtectedThing.model";
import { hashSaltPassword } from "../utils/auth";

const users = `CREATE TABLE IF NOT EXISTS
      users(
        id UUID PRIMARY KEY,
        email VARCHAR(200) NOT NULL UNIQUE,
        password_digest VARCHAR(200) NOT NULL,
        email_verified BOOLEAN NOT NULL DEFAULT FALSE,
        created_at TIMESTAMP NOT NULL,
        updated_at TIMESTAMP NOT NULL
      )`;

const protectedThings = `CREATE TABLE IF NOT EXISTS
      protected_things(
        id UUID PRIMARY KEY,
        text VARCHAR(2000) NOT NULL,
        user_id UUID NOT NULL,
        FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE, 
        created_at TIMESTAMP NOT NULL,
        updated_at TIMESTAMP NOT NULL
      )`;

const tableQueries = [users, protectedThings];
const tableNames = ["users", "protected_things"];

async function createAllTables() {
  try {
    await asyncForEach(tableQueries, async queryText => {
      await db.queryReturningNone(queryText);
    });
    return true;
  } catch (err) {
    console.log(err);
  }
}

async function dropAllTables() {
  try {
    await asyncForEach(tableNames, async tableName => {
      await db.queryReturningNone(`DROP TABLE IF EXISTS ${tableName} CASCADE`, [
        tableName
      ]);
    });
    return true;
  } catch (err) {
    console.log(err);
  }
}

async function seedUsersAndProtectedThings() {
  try {
    await asyncForEach(seedData.users, async user => {
      const { email, password } = user;
      const passwordDigest = await hashSaltPassword(password);
      const createdUser = await User.create(email, passwordDigest);
      await asyncForEach(user.protectedThings, async protectedThing => {
        await ProtectedThing.create(createdUser.id, protectedThing.text);
      });
    });
    return true;
  } catch (err) {
    console.log(err);
  }
}

async function dropAndBuildTables() {
  await dropAllTables();
  await createAllTables();
  await seedUsersAndProtectedThings();
  console.log("Done");
}

dropAndBuildTables();
