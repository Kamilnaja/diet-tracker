import { db } from "@db/db";
import { tables } from "@db/db-table-names";
import { Food } from "@modules/food/models/food.model";
import { MealType } from "@modules/food/models/meal-type.model";
import { Diary } from "../models/diary.model";
import { FoodInDiary } from "../models/food-in-diary.model";

export class DiaryService {
  private static readonly joinQuery = `
  SELECT 
    df.diary_id, 
    df.food_id as unique_food_id, 
    d.date, 
    fid.food_id as food_id, 
    fid.weight, 
    fid.meal_type
  FROM ${tables.DIARY_FOOD} df
  INNER JOIN ${tables.FOOD_IN_DIARY} fid
    ON df.food_id = fid.id
  INNER JOIN diary d 
    ON df.diary_id = d.id`;

  static getAllDiaryEntries = async (): Promise<Diary[]> => {
    const rows = await db.all(this.joinQuery);

    return DiaryService.groupDiaryById(rows);
  };

  static getDiaryEntriesByDate = async (date: string): Promise<Diary[]> => {
    const query = `    
      ${this.joinQuery}
      WHERE d.date = ?`;

    const rows = await db.all(query, [date]);

    return DiaryService.groupDiaryById(rows);
  };

  static getDiaryEntryById = async (id: string): Promise<Diary | undefined> => {
    const query = `    
    ${this.joinQuery}
    WHERE d.id = ?
    LIMIT 1`;
    const rows = await db.all<Diary>(query, [id]);
    return DiaryService.groupDiaryById(rows as any)[0];
  };

  static getDiaryEntryIdForDay = async (date: string): Promise<number> => {
    const query = `
    SELECT id FROM ${tables.DIARY} 
    WHERE date = ?
    LIMIT 1`;

    const result = await db.get(query, [date]);

    return result?.id;
  };

  static addDiaryItem = async (date: string): Promise<void> => {
    const query = `INSERT INTO ${tables.DIARY} (date) VALUES (?)`;

    await db.run(query, [date]);
  };

  static getLastDiaryItemId = async (): Promise<number> => {
    const query = `
    SELECT id FROM ${tables.DIARY} 
    ORDER BY id DESC 
    LIMIT 1`;
    const result = await db.get(query);
    return result?.id;
  };

  static addFoodToDiary = async (
    id: number,
    food: FoodInDiary
  ): Promise<void> => {
    await db.run(
      `INSERT INTO ${tables.FOOD_IN_DIARY}
           (food_id, weight, meal_type, date_added)   
           VALUES (?, ?, ?, datetime(CURRENT_TIMESTAMP, 'localtime'))`,
      [food.id, food.weight, food.mealType, food.dateAdded]
    );

    const newestFoodID = await db.get(
      `SELECT id FROM ${tables.FOOD_IN_DIARY}
       ORDER BY id DESC 
       LIMIT 1`
    );

    await db.run(
      `INSERT INTO ${tables.DIARY_FOOD} (diary_id, food_id)
           VALUES (?, ?)`,
      [id, newestFoodID?.id]
    );
  };

  static addFoodToExistingDiary = async (
    diaryId: string,
    food: FoodInDiary
  ): Promise<void> => {
    await db.run(
      `INSERT INTO ${tables.FOOD_IN_DIARY}
       (food_id, weight, meal_type, date_added)   
       VALUES (?, ?, ?, datetime(CURRENT_TIMESTAMP, 'localtime'))`,
      [food.id, food.weight, food.mealType]
    );
    await db.run(
      `INSERT INTO ${tables.DIARY_FOOD} (diary_id, food_id)
       VALUES (?, ?)`,
      [diaryId, food.id]
    );
  };

  static editDiaryEntry = async (
    uniqueFoodId: string, // unique food id
    food: Food
  ): Promise<void> => {
    if (!uniqueFoodId) {
      throw new Error("No such food in diary");
    }

    const query = `
      UPDATE ${tables.FOOD_IN_DIARY}
      SET weight = ?, meal_type = ?
      WHERE id = ?`;

    await db.run(query, [food.weight, food.mealType, uniqueFoodId]);
  };

  static deleteFoodFromDiary = async (
    diaryId: string,
    foodId: string
  ): Promise<void> => {
    const query = `
    DELETE FROM ${tables.DIARY_FOOD} 
    WHERE diary_id = ? AND food_id = ?`;

    await db.run(query, [diaryId, foodId]);
    const deleteFoodInDiaryQuery = `DELETE FROM ${tables.FOOD_IN_DIARY} WHERE id = ?`;
    await db.run(deleteFoodInDiaryQuery, [foodId]);
  };

  static deleteDiaryItemById = async (id: string): Promise<void> => {
    const query = `
    DELETE FROM ${tables.DIARY_FOOD}
    WHERE diary_id = ?`;

    await db.run(query, [id]);
  };

  private static groupDiaryById(rows: Row[]): Diary[] {
    return rows.reduce((acc: Diary[], item: Row) => {
      const { diary_id } = item;

      const foundIndex = acc.findIndex((item) => item.id === diary_id);

      if (foundIndex > -1) {
        acc[foundIndex]?.food.push({
          id: item.food_id,
          weight: item.weight,
          mealType: item.meal_type,
          dateAdded: item.date_added,
          uniqueFoodId: item.unique_food_id,
          food_id: item.food_id,
        });
      } else {
        acc.push({
          id: item.diary_id,
          date: item.date,
          food: [
            {
              id: item.food_id,
              weight: item.weight,
              mealType: item.meal_type,
              dateAdded: item.date_added,
              uniqueFoodId: item.unique_food_id,
              food_id: item.food_id,
            },
          ],
        });
      }
      return acc;
    }, []);
  }
}

interface Row extends FoodInDiary {
  meal_type: MealType;
  date_added: string;
  diary_id: string; // id of diary entry
  date: string; // date of diary entry
  unique_food_id: string;
}
