import { db } from "@db/db";
import { DIARY_FOODS, FOOD_IN_DIARY } from "@db/db-table-names";
import { MealType } from "@modules/foods/models/meal-type.model";
import { Diary } from "../models/diary.model";
import { FoodInDiary } from "../models/food-in-diary.model";

export class DiaryService {
  private static joinQuery = `
  SELECT df.diary_id, d.date, fid.food_id as food_id, fid.weight, fid.meal_type
  FROM diary_foods df
  INNER JOIN food_in_diary fid
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
    LIMIT 1
    `;
    let rows = await db.all<Diary>(query, [id]);
    return DiaryService.groupDiaryById(rows as any)[0];
  };

  static getDiaryEntryIdForDay = async (date: string): Promise<number> => {
    const query = `
    SELECT id FROM diary 
    WHERE date = ?
    LIMIT 1`;

    const result = await db.get(query, [date]);

    return result?.id;
  };

  static addDiaryItem = async (date: string): Promise<void> => {
    const query = `INSERT INTO diary (date) VALUES (?)`;

    await db.run(query, [date]);
  };

  static getLastDiaryItemId = async (): Promise<number> => {
    const query = `SELECT id FROM diary ORDER BY id DESC LIMIT 1`;
    const result = await db.get(query);
    return result?.id;
  };

  static addFoodToDiary = async (
    id: number,
    food: FoodInDiary
  ): Promise<void> => {
    await db.run(
      `INSERT INTO ${FOOD_IN_DIARY}
           (food_id, weight, meal_type, date_added)   
           VALUES (?, ?, ?, datetime(CURRENT_TIMESTAMP, 'localtime'))`,
      [food.id, food.weight, food.mealType, food.dateAdded]
    );

    const newestFoodID = await db.get(
      `SELECT id FROM food_in_diary ORDER BY id DESC LIMIT 1`
    );

    await db.run(
      `INSERT INTO ${DIARY_FOODS} (diary_id, food_id)
           VALUES (?, ?)`,
      [id, newestFoodID?.id]
    );
  };

  static addFoodsToExistingDiary = async (
    diaryId: string,
    food: FoodInDiary
  ): Promise<void> => {
    await db.run(
      `INSERT INTO ${FOOD_IN_DIARY}
       (food_id, weight, meal_type, date_added)   
       VALUES (?, ?, ?, datetime(CURRENT_TIMESTAMP, 'localtime'))`,
      [food.id, food.weight, food.mealType]
    );
    await db.run(
      `INSERT INTO ${DIARY_FOODS} (diary_id, food_id)
       VALUES (?, ?)`,
      [diaryId, food.id]
    );
  };

  static deleteFoodFromDiary = async (
    diaryId: string,
    foodId: string
  ): Promise<void> => {
    const query = `
    DELETE FROM diary_foods 
    WHERE diary_id = ? AND food_id = ?`;

    await db.run(query, [diaryId, foodId]);
    const deleteFoodInDiaryQuery = `DELETE FROM food_in_diary WHERE id = ?`;
    await db.run(deleteFoodInDiaryQuery, [foodId]);
  };

  static deleteDiaryItemById = async (id: string): Promise<void> => {
    const query = `
    DELETE FROM diary_foods WHERE diary_id = ?`;

    await db.run(query, [id]);
  };

  private static groupDiaryById(rows: Row[]): Diary[] {
    return rows.reduce((acc: Diary[], item: Row) => {
      const { diary_id } = item;

      const foundIndex = acc.findIndex((item) => item.id === diary_id);

      if (foundIndex > -1) {
        acc[foundIndex]?.foods.push({
          id: item.food_id,
          weight: item.weight,
          mealType: item.meal_type,
          dateAdded: item.date_added,
        } as FoodInDiary);
      } else {
        acc.push({
          id: item.diary_id,
          date: item.date,
          foods: [
            {
              id: item.food_id,
              weight: item.weight,
              mealType: item.meal_type,
              dateAdded: item.date_added,
            } as FoodInDiary,
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
  diary_id: string;
  date: string; // date of diary entry
}
