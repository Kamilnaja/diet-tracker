import { db } from "../../../db";
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

    return db.all(query, [], (err: { message: string }, rows: any) => {
      if (err) {
        return err;
      }
      return rows;
    });
  };

  static getAllFoodsByName = (name: string, callback: (arg0: any) => void) => {
    db.all(
      `SELECT f.*, GROUP_CONCAT(t.id) AS tags
    FROM foods f
    LEFT JOIN food_tags ft ON f.id = ft.food_id
    LEFT JOIN tags t ON ft.tag_id = t.id
    WHERE f.name LIKE '%' || ? || '%'
    GROUP BY f.id`,
      [name],
      (err: any, rows: any) => {
        if (err) {
          console.error(err.message);
        }

        callback(rows);
      }
    );
  };

  static getFoodById = (id: string, callback: (arg0: any) => void) => {
    const query = `
      SELECT f.*, GROUP_CONCAT(t.id) AS tags
      FROM foods f 
      LEFT JOIN food_tags ft ON f.id = ft.food_id
      LEFT JOIN tags t ON ft.tag_id = t.id
      WHERE f.id = ? 
      GROUP BY f.id
    `;

    db.get(query, [id], (err: { message: any }, row: any) => {
      if (err) {
        console.error(err.message);
      }

      callback(row);
    });
  };

  static addNewFood = (food: Food, callback: (arg0: any) => void) => {
    const { name, weight, caloriesPer100g, nutriScore, tags = [] } = food;

    const query = `
      INSERT INTO foods (name, weight, caloriesPer100g, nutriScore) 
      VALUES (?, ?, ?, ?)
    `;

    db.run(query, [name, weight, caloriesPer100g, nutriScore], (err: any) => {
      if (err) {
        console.error(err.message);
      }

      const id = db.lastID;

      if (tags.length) {
        tags.forEach((tagId) => {
          const tagQuery = `
            INSERT INTO food_tags (food_id, tag_id) VALUES (?, ?)
          `;
          db.run(tagQuery, [id, tagId], (err: any) => {
            if (err) {
              console.error(err.message);
            }
          });
        });
      }

      callback({ id, ...food });
    });
  };

  static editFood = async (id: string, foodData: Food): Promise<void> => {
    return new Promise((resolve, reject) => {
      const { name, weight, caloriesPer100g, nutriScore, tags = [] } = foodData;

      db.run(
        `UPDATE foods SET name = ?, weight = ?, caloriesPer100g = ?, nutriScore = ? WHERE id = ?`,
        [name, weight, caloriesPer100g, nutriScore, id],
        (err: any) => {
          if (err) {
            reject(err.message);
            return;
          }

          db.run(
            `DELETE FROM food_tags WHERE food_id = ?`,
            [id],
            (err: any) => {
              if (err) {
                reject(err.message);
                return;
              }

              tags.forEach((tagId: string) => {
                db.run(
                  `INSERT INTO food_tags (food_id, tag_id) VALUES (?, ?)`,
                  [id, tagId],
                  (err: any) => {
                    if (err) {
                      reject(err.message);
                      return;
                    }
                  }
                );
              });

              resolve();
            }
          );
        }
      );
    });
  };

  static deleteFood = (id: string, callback: (arg0: any) => void) => {
    db.run(`DELETE FROM foods WHERE id = ?`, [id], (err: any) => {
      if (err) {
        console.error(err.message);
      }

      callback({ id });
    });
  };
}
