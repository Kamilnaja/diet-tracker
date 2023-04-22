import { db } from "./db";
import {
  DIARY,
  DIARY_FOODS,
  FOODS,
  FOOD_IN_DIARY,
  FOOD_TAGS,
  TAGS,
} from "./db-table-names";

export async function createTables(): Promise<void> {
  await db
    .run(
      `CREATE TABLE IF NOT EXISTS ${FOODS} (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      caloriesPer100g INTEGER,
      weight INTEGER NOT NULL,
      nutriScore TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );`
    )
    .then(() => console.log(`${FOODS} table has been created`))
    .catch((err: Error) => console.error(err));

  await db
    .run(
      `CREATE TABLE IF NOT EXISTS ${TAGS} (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        tag_name TEXT UNIQUE NOT NULL
      );`
    )
    .then(() => console.log(`${TAGS} table has been created`))
    .catch((err: Error) => console.error(err));

  await db
    .run(
      `CREATE TABLE IF NOT EXISTS ${FOOD_TAGS} (
        food_id INTEGER NOT NULL,
        tag_id INTEGER NOT NULL,
        PRIMARY KEY (food_id, tag_id),
        FOREIGN KEY (food_id) REFERENCES foods(food_id),
        FOREIGN KEY (tag_id) REFERENCES tags(tag_id)
      );`
    )
    .then(async () => {
      console.log(`${FOOD_TAGS} table has been created`);
    });

  await db
    .run(
      `CREATE TABLE IF NOT EXISTS ${DIARY} (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        date DATE NOT NULL
      );`
    )
    .catch((err: Error) => console.error(err))
    .then(() => console.log(`${DIARY} table has been created`));

  await db
    .run(
      `CREATE TABLE IF NOT EXISTS ${FOOD_IN_DIARY} (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      food_id INTEGER NOT NULL,
      weight REAL NOT NULL,
      meal_type TEXT,
      date_added DATE NOT NULL,
      FOREIGN KEY (id) REFERENCES ${FOODS} (id)
    );`
    )
    .catch((err: Error) => console.error(err))
    .then(() => console.log(`${FOOD_IN_DIARY} table has been created`));

  await db
    .run(
      `CREATE TABLE IF NOT EXISTS ${DIARY_FOODS} (
      diary_id VARCHAR(255),
      food_id INTEGER NOT NULL,
      FOREIGN KEY (diary_id) REFERENCES ${DIARY} (id),
      FOREIGN KEY (food_id) REFERENCES ${FOOD_IN_DIARY} (id))`
    )
    .then(() => console.log(`${DIARY_FOODS} table has been created`));
}
