const sqlite3 = require("sqlite3").verbose();
import { open } from "sqlite";
import { createTables } from "./db-create-scripts";
import { dropTables } from "./db-drop-scripts";
import { loadInitialFoods } from "./db-insert-scripts";

export let db: any;

export const startDb = async () => {
  try {
    db = await open({
      filename: "test.db",
      driver: sqlite3.Database,
    });

    console.log("Database connection established!");

    await dropTables(db);
    await createTables(db);
    await loadInitialFoods(db);
  } catch (error) {
    console.error(error);
  }
};
