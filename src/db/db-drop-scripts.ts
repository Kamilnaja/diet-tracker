import { logSuccessMessage } from "@shared/helpers/log-success-message";
import { db } from "./db";
import { tables } from "./db-table-names";

export async function dropTables(): Promise<void> {
  console.log("--------------------");
  console.log("Dropping tables");
  for await (const item of Object.values(tables)) {
    await db
      .run(`DROP TABLE IF EXISTS ${item};`)
      .then(() => logSuccessMessage(item))
      .catch((err: Error) => console.error(err));
  }
}
