import { logSuccessMessage } from "@shared/helpers/log-success-message";
import { ISqlite } from "sqlite";
import { Statement } from "sqlite3";
import { db } from "./db";
import { tables } from "./db-table-names";

type DbRunResult = Promise<void | ISqlite.RunResult<Statement>>;

export async function createTables(): Promise<void> {
  console.log("--------------------");
  console.log("Creating tables");
  await createFood();
  await createTags();
  await createFoodTags();
  await createDiary();
  await createFoodInDiary();
  await createDiaryFood();
  await createUsers();
  await createRoles();
  await createWeights();
  await createSettings();
}

const createUsers = async (): DbRunResult => {
  return db
    .run(
      `CREATE TABLE IF NOT EXISTS ${tables.USERS} (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL
  )`
    )
    .then(() => logSuccessMessage(tables.USERS))
    .catch((err: Error) => console.error(err));
};

const createDiaryFood = async (): DbRunResult => {
  await db
    .run(
      `CREATE TABLE IF NOT EXISTS ${tables.DIARY_FOOD} (
      diary_id VARCHAR(255),
      food_id INTEGER NOT NULL,
      FOREIGN KEY (diary_id) REFERENCES ${tables.DIARY} (id),
      FOREIGN KEY (food_id) REFERENCES ${tables.FOOD_IN_DIARY} (id))`
    )
    .then(() => logSuccessMessage(tables.DIARY_FOOD))
    .catch((err: Error) => console.error(err));
};

const createFoodInDiary = async (): DbRunResult => {
  await db
    .run(
      `CREATE TABLE IF NOT EXISTS ${tables.FOOD_IN_DIARY} (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      food_id INTEGER NOT NULL,
      weight REAL NOT NULL,
      meal_type TEXT,
      date_added DATE NOT NULL,
      FOREIGN KEY (id) REFERENCES ${tables.FOOD} (id)
    );`
    )
    .then(() => logSuccessMessage(tables.FOOD_IN_DIARY))
    .catch((err: Error) => console.error(err));
};

const createDiary = async (): DbRunResult => {
  return db
    .run(
      `CREATE TABLE IF NOT EXISTS ${tables.DIARY} (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        date DATE NOT NULL
      );`
    )
    .then(() => logSuccessMessage(tables.DIARY))
    .catch((err: Error) => console.error(err));
};

const createFoodTags = async (): DbRunResult => {
  await db
    .run(
      `CREATE TABLE IF NOT EXISTS ${tables.FOOD_TAGS} (
        food_id INTEGER NOT NULL,
        tag_id INTEGER NOT NULL,
        PRIMARY KEY (food_id, tag_id),
        FOREIGN KEY (food_id) REFERENCES food(food_id),
        FOREIGN KEY (tag_id) REFERENCES tags(tag_id)
      );`
    )
    .then(async () => logSuccessMessage(tables.FOOD_TAGS))
    .catch((err: Error) => console.error(err));
};

const createTags = async (): DbRunResult => {
  return db
    .run(
      `CREATE TABLE IF NOT EXISTS ${tables.TAGS} (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        tag_name TEXT UNIQUE NOT NULL
      );`
    )
    .then(() => logSuccessMessage(tables.TAGS))
    .catch((err: Error) => console.error(err));
};

const createFood = async (): DbRunResult => {
  return db
    .run(
      `CREATE TABLE IF NOT EXISTS ${tables.FOOD} (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      caloriesPer100g INTEGER,
      weight INTEGER NOT NULL,
      nutriScore TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      photo TEXT
      );`
    )
    .then(() => logSuccessMessage(tables.FOOD))
    .catch((err: Error) => console.error(err));
};

const createRoles = async (): DbRunResult => {
  return db
    .run(
      `CREATE TABLE IF NOT EXISTS ${tables.ROLES} (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT UNIQUE NOT NULL
    )`
    )
    .then(() => logSuccessMessage(tables.ROLES))
    .catch((err: Error) => console.error(err));
};

const createWeights = async (): DbRunResult => {
  return db
    .run(
      `CREATE TABLE IF NOT EXISTS ${tables.WEIGHTS} (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      weight REAL NOT NULL,
      date DATE NOT NULL)
      `
    )
    .then(() => logSuccessMessage(tables.WEIGHTS))
    .catch((err: Error) => console.error(err));
};

const createSettings = async (): DbRunResult => {
  return db
    .run(
      `
      CREATE TABLE IF NOT EXISTS ${tables.SETTINGS} (
        user_id         INTEGER REFERENCES ${tables.USERS} (id), 
        id              INTEGER PRIMARY KEY AUTOINCREMENT,
        height          REAL    CHECK(height > 50),
        age             INTEGER CHECK(age > 0),
        cookie_accepted BOOLEAN DEFAULT FALSE,
        theme           TEXT    CHECK(theme IN ('light', 'dark')) DEFAULT 'light',
        email           TEXT UNIQUE,
        gender          TEXT    CHECK(gender IN ('male', 'female'))
    )`
    )
    .then(() => logSuccessMessage(tables.SETTINGS))
    .catch((err: Error) => console.error("create", tables.SETTINGS, err));
};
