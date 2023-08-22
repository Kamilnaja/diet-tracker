import { shouldLoadInitialData } from "@shared/helpers/utils";
import { Database, open } from "sqlite";
import sqlite3 from "sqlite3";
import { createTables } from "./db-create-scripts";
import { dropTables } from "./db-drop-scripts";
import { loadInitialData } from "./db-insert-scripts";

export let db: Database;

export const startDb = async (): Promise<void> => {
  try {
    db = await open({
      filename: shouldLoadInitialData() ? "db.db" : "test.db",
      driver: sqlite3.Database,
    });

    console.log("⚡Database connection established!");

    await dropTables();
    await createTables();
    await loadInitialData();
  } catch (error) {
    console.error(error);
  }
};
