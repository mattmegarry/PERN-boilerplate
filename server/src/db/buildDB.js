"use strict";

import db from "./index";
import asyncForEach from "../utils/asyncForEach";

const users = `CREATE TABLE IF NOT EXISTS
      users(
        id UUID PRIMARY KEY,
        email VARCHAR(200) NOT NULL UNIQUE,
        password_digest VARCHAR(200) NOT NULL,
        email_verified BOOLEAN NOT NULL DEFAULT FALSE,
        created_at TIMESTAMP NOT NULL,
        updated_at TIMESTAMP NOT NULL
      )`;

const tableQueries = [users];
const tableNames = ["users"];

async function createAllTables() {
  await asyncForEach(tableQueries, async queryText => {
    await db.queryReturningNone(queryText);
  });
  return true;
}

async function dropAllTables() {
  await asyncForEach(tableNames, async tableName => {
    await db.queryReturningNone(`DROP TABLE IF EXISTS ${tableName} CASCADE`, [
      tableName
    ]);
  });
  return true;
}

async function dropAndBuildTables() {
  await dropAllTables();
  await createAllTables();
  console.log("Done");
}

dropAndBuildTables();
