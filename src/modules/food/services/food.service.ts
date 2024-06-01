import { db } from "@db/db";
import { tables } from "@db/db-table-names";
import { views } from "@db/db-views-scripts";
import { Food, FoodDb } from "../models/food.model";
import { joinClause, limitClause, offsetClause } from "./food.clauses";

export class FoodService {
  getFoodByTagsAndName = async (
    tag?: number,
    name?: string,
    limit?: number,
    page?: number
  ): Promise<FoodDb[]> => {
    if (name && !tag) {
      return await this.getAllFoodByName(name, limit, page);
    } else if (tag && !name) {
      return await this.getFoodByTag(tag, limit, page);
    } else if (name && tag) {
      return await this.getAllFoodByTagAndName(tag, name, limit, page);
    } else {
      return await this.getAllFood(limit, page);
    }
  };

  /**
   * Retrieves all food items.
   * @returns A promise that resolves to an array of Food objects.
   */
  getAllFood = async (limit?: number, page?: number): Promise<FoodDb[]> => {
    const query = `
      SELECT * FROM ${views.food}
      ${limitClause(limit)}
      ${offsetClause(limit, page)}
    `;
    return db.all(query);
  };

  /**
   * Retrieves all food items by name.
   * @param name - The name of the food items to retrieve.
   * @param page - The page number for pagination (optional).
   * @param limit - The maximum number of items per page (optional).
   * @returns A promise that resolves to an array of Food objects.
   */
  getAllFoodByName = async (
    name: string,
    limit?: number,
    page?: number
  ): Promise<FoodDb[]> => {
    return await db.all(
      `
      ${joinClause}
      WHERE f.name LIKE '%' || ? || '%'
      GROUP BY f.id
      ${limitClause(limit)}
      ${offsetClause(limit, page)}`,
      [name]
    );
  };

  getFoodByTag = async (
    tag: number,
    limit?: number,
    page?: number
  ): Promise<FoodDb[]> => {
    try {
      const request = await db.all(
        `
        SELECT * FROM (
          SELECT * FROM ${views.food})
          WHERE tags LIKE '%${tag}%'
          ${limitClause(limit)}
          ${offsetClause(limit, page)}
        `
      );
      return request;
    } catch (err) {
      console.log(err);
      return [];
    }
  };

  getFoodById = async (id: string): Promise<FoodDb | undefined> => {
    const query = `
      ${joinClause}
      WHERE f.id = ? 
      GROUP BY f.id
    `;
    return await db.get(query, [id]);
  };

  private async getAllFoodByTagAndName(
    tag: number,
    name: string,
    limit?: number,
    offset?: number
  ): Promise<FoodDb[]> {
    try {
      const request = await db.all(
        `
        SELECT * FROM (
          SELECT * FROM ${views.food}
        )
          WHERE tags LIKE '%${tag}%'
          AND name LIKE '%${name}%'
          ${limitClause(limit)}
          ${offsetClause(limit, offset)}
          `
      );
      return request;
    } catch (err) {
      console.log(err);
      return [];
    }
  }

  addNewFood = async (food: Food): Promise<void> => {
    const { name, weight, caloriesPer100g, nutriScore, photo } = food;

    const query = `
      INSERT INTO ${tables.FOOD} (name, weight, caloriesPer100g, nutriScore, photo) 
      VALUES (?, ?, ?, ?, ?)
    `;

    await db.run(query, [name, weight, caloriesPer100g, nutriScore, photo]);
  };

  addTags = async (tags: number[]): Promise<void> => {
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

  editFood = async (id: string, foodData: Food): Promise<void> => {
    const {
      name,
      weight,
      caloriesPer100g,
      nutriScore,
      tags = [],
      photo,
    } = foodData;
    await db.run(
      `UPDATE ${tables.FOOD} SET name = ?, weight = ?, caloriesPer100g = ?, nutriScore = ?, photo = ? WHERE id = ?`,
      [name, weight, caloriesPer100g, nutriScore, photo, id]
    );

    // Delete existing tags for the given food_id
    await db.run(`DELETE FROM ${tables.FOOD_TAGS} WHERE food_id = ?`, [id]);

    // Split tags string and insert new tags one by one
    tags.forEach(async (tagId) => {
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

  deleteFood = async (id: string): Promise<void> => {
    await db.run(`DELETE FROM ${tables.FOOD} WHERE id = ?`, [id]);
  };
}
