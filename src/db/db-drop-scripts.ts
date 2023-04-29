import { db } from "./db";
import { tables } from "./db-table-names";

export async function dropTables(): Promise<void> {
  for await (const item of Object.values(tables)) {
    await db
      .run(`DROP TABLE IF EXISTS ${item};`)
      .then(() => {
        console.log(`🧨 ${item} table has been dropped 🧨`);
      })
      .catch((err: Error) => console.error(err));
  }
}
