import { db } from "./db";
import { tables } from "./db-table-names";

export async function dropTables(): Promise<void> {
  Promise.all([
    await db.run(`DROP TABLE IF EXISTS ${tables.FOODS};`),
    await db.run(`DROP TABLE IF EXISTS ${tables.TAGS};`),
    await db.run(`DROP TABLE IF EXISTS ${tables.FOOD_TAGS};`),
    await db.run(`DROP TABLE IF EXISTS ${tables.DIARY};`),
    await db.run(`DROP TABLE IF EXISTS ${tables.DIARY_FOODS};`),
    await db.run(`DROP TABLE IF EXISTS ${tables.FOOD_IN_DIARY};`),
    await db.run(`DROP TABLE IF EXISTS ${tables.USERS};`),
  ])
    .then(() => console.log("All tables dropped successfully"))
    .catch((err: Error) => console.error(err));
}
