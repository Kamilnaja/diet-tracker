import { db } from "@db/db";
import { tables } from "@db/db-table-names";
import { Food } from "../models/food.model";

export class FoodService {
  static readonly join = `SELECT f.*, GROUP_CONCAT(t.id) AS tags
  FROM food f
  LEFT JOIN food_tags ft ON f.id = ft.food_id
  LEFT JOIN tags t ON ft.tag_id = t.id`;

  static getFoodByTagsAndName = async (
    tag: number,
    name: string | undefined
  ): Promise<Food[]> => {
    if (name && !tag) {
      return await FoodService.getAllFoodByName(name);
    } else if (tag && !name) {
      return await FoodService.getFoodByTag(tag);
    } else if (name && tag) {
      return await FoodService.getAllFoodByTagAndName(tag, name);
    } else {
      return await FoodService.getAllFood();
    }
  };

  static getAllFood = async (): Promise<Food[]> => {
    const query = `
      ${this.join}
      GROUP BY f.id
    `;

    return db.all(query);
  };

  static getAllFoodByName = async (name: string): Promise<Food[]> => {
    return await db.all(
      `
      ${this.join}
      WHERE f.name LIKE '%' || ? || '%'
      GROUP BY f.id`,
      [name]
    );
  };

  static getFoodByTag = async (tag: number): Promise<Food[]> => {
    const request = await db.all(
      `
      SELECT * FROM (
        ${this.join}
        GROUP BY f.id)
        WHERE tags LIKE '%${tag}%'
        `
    );
    return request;
  };

  static getFoodById = async (id: string): Promise<Food | undefined> => {
    const query = `
      ${this.join}
      WHERE f.id = ? 
      GROUP BY f.id
    `;
    return await db.get(query, [id]);
  };

  private static async getAllFoodByTagAndName(
    tag: number,
    name: string
  ): Promise<Food[]> {
    try {
      const request = await db.all(
        `
        SELECT * FROM (
          ${this.join}
          GROUP BY f.id)
          WHERE tags LIKE '%${tag}%'
          AND name LIKE '%${name}%'  
          `
      );
      return request;
    } catch (err) {
      console.log(err);
      return [];
    }
  }

  static addNewFood = async (food: Food): Promise<void> => {
    const { name, weight, caloriesPer100g, nutriScore, photo } = food;

    const query = `
      INSERT INTO ${tables.FOOD} (name, weight, caloriesPer100g, nutriScore, photo) 
      VALUES (?, ?, ?, ?, ?)
    `;

    await db.run(query, [name, weight, caloriesPer100g, nutriScore, photo]);
  };

  static addTags = async (tags: number[]): Promise<void> => {
    if (tags.length) {
      const lastFoodItem = await db.get(
        `SELECT id FROM ${tables.FOOD} ORDER BY id DESC LIMIT 1`
      );
      const rowId = lastFoodItem.id;
      tags.forEach(async (tag) => {
        const tagQuery = `
        INSERT INTO ${tables.FOOD_TAGS} (food_id, tag_id) 
        VALUES (?, ?)`;
        await db.run(tagQuery, [rowId, tag]);
      });
    }
  };

  static editFood = async (id: string, foodData: Food): Promise<void> => {
    const { name, weight, caloriesPer100g, nutriScore, tags, photo } = foodData;
    await db.run(
      `UPDATE ${tables.FOOD} SET name = ?, weight = ?, caloriesPer100g = ?, nutriScore = ?, photo = ? WHERE id = ?`,
      [name, weight, caloriesPer100g, nutriScore, photo, id]
    );

    // Delete existing tags for the given food_id
    await db.run(`DELETE FROM ${tables.FOOD_TAGS} WHERE food_id = ?`, [id]);

    // Split tags string and insert new tags one by one
    tags?.split(",").forEach(async (tagId) => {
      await db
        .run(
          `INSERT INTO ${tables.FOOD_TAGS} (food_id, tag_id) VALUES (?, ?)`,
          [id, tagId.trim()]
        )
        .then(() => {
          console.log("tag added");
        })
        .catch((err: Error) => {
          console.log(err);
        });
    });
  };

  static deleteFood = async (id: string): Promise<void> => {
    await db.run(`DELETE FROM ${tables.FOOD} WHERE id = ?`, [id]);
  };
}
