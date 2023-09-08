import { ISqlite } from "sqlite";
import { Statement } from "sqlite3";
import { db } from "./db";
import { tables } from "./db-table-names";

type DbRunResult = Promise<void | ISqlite.RunResult<Statement>>;

export async function createTables(): Promise<void> {
  await createFoods();
  await createTags();
  await createFoodTags();
  await createDiary();
  await createFoodInDiary();
  await createDiaryFoods();
  await createUsers();
  await createRoles();
  await createWeights();
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
    .then(() => {
      console.log(`${tables.USERS} table has been created`);
    });
};

const createDiaryFoods = async (): DbRunResult => {
  await db
    .run(
      `CREATE TABLE IF NOT EXISTS ${tables.DIARY_FOODS} (
      diary_id VARCHAR(255),
      food_id INTEGER NOT NULL,
      FOREIGN KEY (diary_id) REFERENCES ${tables.DIARY} (id),
      FOREIGN KEY (food_id) REFERENCES ${tables.FOOD_IN_DIARY} (id))`
    )
    .then(() => console.log(`${tables.DIARY_FOODS} table has been created`));
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
      FOREIGN KEY (id) REFERENCES ${tables.FOODS} (id)
    );`
    )
    .catch((err: Error) => console.error(err))
    .then(() => console.log(`${tables.FOOD_IN_DIARY} table has been created`));
};

const createDiary = async (): DbRunResult => {
  return db
    .run(
      `CREATE TABLE IF NOT EXISTS ${tables.DIARY} (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        date DATE NOT NULL
      );`
    )
    .catch((err: Error) => console.error(err))
    .then(() => console.log(`${tables.DIARY} table has been created`));
};

const createFoodTags = async (): DbRunResult => {
  await db
    .run(
      `CREATE TABLE IF NOT EXISTS ${tables.FOOD_TAGS} (
        food_id INTEGER NOT NULL,
        tag_id INTEGER NOT NULL,
        PRIMARY KEY (food_id, tag_id),
        FOREIGN KEY (food_id) REFERENCES foods(food_id),
        FOREIGN KEY (tag_id) REFERENCES tags(tag_id)
      );`
    )
    .then(async () => {
      console.log(`${tables.FOOD_TAGS} table has been created`);
    });
};

const createTags = async (): DbRunResult => {
  return db
    .run(
      `CREATE TABLE IF NOT EXISTS ${tables.TAGS} (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        tag_name TEXT UNIQUE NOT NULL
      );`
    )
    .then(() => console.log(`${tables.TAGS} table has been created`))
    .catch((err: Error) => console.error(err));
};

const createFoods = async (): DbRunResult => {
  return db
    .run(
      `CREATE TABLE IF NOT EXISTS ${tables.FOODS} (
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
    .then(() => console.log(`${tables.FOODS} table has been created`))
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
    .then(() => console.log(`${tables.ROLES} table has been created`))
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
    .then(() => console.log(`🤔${tables.WEIGHTS} table has been created`))
    .catch((err: Error) => console.error(err));
};
