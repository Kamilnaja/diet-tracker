import { db } from "@db/db";
import { Food } from "../models/food.model";

export class FoodsService {
  static readonly join = `SELECT f.*, GROUP_CONCAT(t.id) AS tags
  FROM foods f
  LEFT JOIN food_tags ft ON f.id = ft.food_id
  LEFT JOIN tags t ON ft.tag_id = t.id`;

  static getAllFoods = async (): Promise<Food[]> => {
    const query = `
      ${this.join}
      GROUP BY f.id
    `;

    return db.all(query);
  };

  static getAllFoodsByName = async (name: string): Promise<Food[]> => {
    return await db.all(
      `
      ${this.join}
      WHERE f.name LIKE '%' || ? || '%'
      GROUP BY f.id`,
      [name]
    );
  };

  static getFoodByTag = async (tag: number): Promise<Food[]> => {
    return await db.all(
      `
      ${this.join}
      WHERE t.id = ?
      GROUP BY f.id`,
      [tag]
    );
  };

  static getFoodsByTagsAndName = async (
    tag: number,
    name: string | undefined
  ): Promise<Food[]> => {
    if (name && !tag) {
      return await FoodsService.getAllFoodsByName(name);
    } else if (tag && !name) {
      return await FoodsService.getFoodByTag(tag);
    } else if (name && tag) {
      return await FoodsService.allFoodsByTagAndName(tag, name);
    } else {
      return await FoodsService.getAllFoods();
    }
  };

  static getFoodById = async (id: string): Promise<Food | undefined> => {
    const query = `
      ${this.join}
      WHERE f.id = ? 
      GROUP BY f.id
    `;

    return await db.get(query, [id]);
  };

  static addNewFood = async (food: Food): Promise<void> => {
    const { name, weight, caloriesPer100g, nutriScore, photo } = food;

    const query = `
      INSERT INTO foods (name, weight, caloriesPer100g, nutriScore, photo) 
      VALUES (?, ?, ?, ?, ?)
    `;

    await db.run(query, [name, weight, caloriesPer100g, nutriScore, photo]);
  };

  static addTags = async (tags: number[]): Promise<void> => {
    if (tags.length) {
      const lastFoodItem = await db.get(
        "SELECT id FROM foods ORDER BY id DESC LIMIT 1"
      );
      const rowId = lastFoodItem.id;
      tags.forEach(async (tag) => {
        const tagQuery = `
        INSERT INTO food_tags (food_id, tag_id) 
        VALUES (?, ?)`;
        await db.run(tagQuery, [rowId, tag]);
      });
    }
  };

  static editFood = async (id: string, foodData: Food): Promise<void> => {
    const { name, weight, caloriesPer100g, nutriScore, tags } = foodData;
    await db.run(
      `UPDATE foods SET name = ?, weight = ?, caloriesPer100g = ?, nutriScore = ? WHERE id = ?`,
      [name, weight, caloriesPer100g, nutriScore, id]
    );

    // Delete existing tags for the given food_id
    await db.run(`DELETE FROM food_tags WHERE food_id = ?`, [id]);

    // Split tags string and insert new tags one by one
    tags?.split(",").forEach(async (tagId) => {
      await db
        .run(`INSERT INTO food_tags (food_id, tag_id) VALUES (?, ?)`, [
          id,
          tagId.trim(),
        ])
        .then(() => {
          console.log("tag added");
        })
        .catch((err: Error) => {
          console.log(err);
        });
    });
  };

  static deleteFood = async (id: string): Promise<void> => {
    await db.run(`DELETE FROM foods WHERE id = ?`, [id]);
  };

  private static async allFoodsByTagAndName(
    tag: number,
    name: string
  ): Promise<Food[]> {
    return await db.all(
      `${this.join}
          WHERE t.id = ? and f.name LIKE '%' || ? || '%'
          GROUP BY f.id`,
      [tag, name]
    );
  }
}
