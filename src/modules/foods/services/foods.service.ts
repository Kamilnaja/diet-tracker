import { db } from "@db/db";
import { Food } from "../models/food.model";
export class FoodsService {
  static getAllFoods = async () => {
    const query = `
      SELECT f.*, GROUP_CONCAT(t.id) AS tags
      FROM foods f
      LEFT JOIN food_tags ft ON f.id = ft.food_id
      LEFT JOIN tags t ON ft.tag_id = t.id
      GROUP BY f.id
    `;

    return db.all(query);
  };

  static getAllFoodsByName = async (name: string) => {
    return await db.all(
      `SELECT f.*, GROUP_CONCAT(t.id) AS tags
      FROM foods f
      LEFT JOIN food_tags ft ON f.id = ft.food_id
      LEFT JOIN tags t ON ft.tag_id = t.id
      WHERE f.name LIKE '%' || ? || '%'
      GROUP BY f.id`,
      [name]
    );
  };

  static getFoodByTag = async (tag: number) => {
    return await db.all(
      `SELECT f.*, GROUP_CONCAT(t.id) AS tags
      FROM foods f
      LEFT JOIN food_tags ft ON f.id = ft.food_id
      LEFT JOIN tags t ON ft.tag_id = t.id
      WHERE t.id = ?
      GROUP BY f.id`,
      [tag]
    );
  };

  static getFoodById = async (id: string) => {
    const query = `
      SELECT f.*, GROUP_CONCAT(t.id) AS tags
      FROM foods f 
      LEFT JOIN food_tags ft ON f.id = ft.food_id
      LEFT JOIN tags t ON ft.tag_id = t.id
      WHERE f.id = ? 
      GROUP BY f.id
    `;

    return await db.get(query, [id]);
  };

  static addNewFood = async (food: Food) => {
    const { name, weight, caloriesPer100g, nutriScore } = food;

    const query = `
      INSERT INTO foods (name, weight, caloriesPer100g, nutriScore) 
      VALUES (?, ?, ?, ?)
    `;

    await db.run(query, [name, weight, caloriesPer100g, nutriScore]);
    return db.run;
  };

  static addTags = async (tags: string[]) => {
    if (tags.length) {
      const lastFoodItem = await db.get(
        "SELECT id FROM foods ORDER BY id DESC LIMIT 1"
      );
      const rowId = lastFoodItem.id;
      tags.forEach(async (tagId) => {
        const tagQuery = `INSERT INTO food_tags (food_id, tag_id) VALUES (?, ?)`;
        await db.run(tagQuery, [rowId, tagId]);
      });
    }
  };

  static editFood = async (id: string, foodData: Food) => {
    const { name, weight, caloriesPer100g, nutriScore, tags = [] } = foodData;

    await db.run(
      `UPDATE foods SET name = ?, weight = ?, caloriesPer100g = ?, nutriScore = ? WHERE id = ?`,
      [name, weight, caloriesPer100g, nutriScore, id]
    );
    await db.run(
      `DELETE FROM food_tags WHERE food_id = ?`,
      [id],
      (err: any) => {
        if (err) {
          return;
        }

        tags.forEach(async (tagId: string) => {
          await db
            .run(`INSERT INTO food_tags (food_id, tag_id) VALUES (?, ?)`, [
              id,
              tagId,
            ])
            .then(() => {
              console.log("tag added");
            })
            .catch((err: any) => {
              console.log(err);
            });
        });
      }
    );
  };

  static deleteFood = async (id: string) => {
    await db.run(`DELETE FROM foods WHERE id = ?`, [id]);
  };
}
