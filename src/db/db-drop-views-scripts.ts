import { db } from "./db";
import { views } from "./db-views-scripts";

export const dropViews = async (): Promise<void> => {
  Object.values(views).forEach(async (view) => {
    await db.run(`DROP VIEW IF EXISTS ${view}`);
  });
};
