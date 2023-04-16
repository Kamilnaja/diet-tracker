const sqlite3 = require("sqlite3").verbose();
import { shouldLoadInitialData } from "@shared/helpers/utils";
import { open } from "sqlite";
import { createTables } from "./db-create-scripts";
import { dropTables } from "./db-drop-scripts";
import { loadInitialData } from "./db-insert-scripts";

export let db: any;

export const startDb = async () => {
  try {
    db = await open({
      filename: shouldLoadInitialData() ? "db.db" : "test.db",
      driver: sqlite3.Database,
    });

    console.log("Database connection established!");

    await dropTables(db);
    await createTables(db);
    await loadInitialData(db);
  } catch (error) {
    console.error(error);
  }
};
