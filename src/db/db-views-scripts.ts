import { db } from "./db";

const food = "food_view";

export const views = { food };

export const createViews = async (): Promise<void> => {
  await createFoodView();
};

const createFoodView = async (): Promise<void> => {
  await db.run(`
        CREATE VIEW ${views.food} AS
        SELECT f.*, GROUP_CONCAT(t.id) AS tags
        FROM food f
        LEFT JOIN food_tags ft ON f.id = ft.food_id
        LEFT JOIN tags t ON ft.tag_id = t.id
        GROUP BY f.id
    `);
};
