import { db } from "./db";
import {
  DIARY,
  DIARY_FOODS,
  FOODS,
  FOOD_IN_DIARY,
  FOOD_TAGS,
  TAGS,
} from "./db-table-names";

export async function dropTables() {
  Promise.all([
    await db.run(`DROP TABLE IF EXISTS ${FOODS};`),
    await db.run(`DROP TABLE IF EXISTS ${TAGS};`),
    await db.run(`DROP TABLE IF EXISTS ${FOOD_TAGS};`),
    await db.run(`DROP TABLE IF EXISTS ${DIARY};`),
    await db.run(`DROP TABLE IF EXISTS ${DIARY_FOODS};`),
    await db.run(`DROP TABLE IF EXISTS ${FOOD_IN_DIARY};`),
  ])
    .then(() => console.log("All tables dropped successfully"))
    .catch((err: any) => console.error(err));
}
