import { db } from "@db/db";
import { DIARY, DIARY_FOODS, FOOD_IN_DIARY } from "@db/db-table-names";
import { Diary } from "../models/diary.model";
import { FoodInDiary } from "../models/food-in-diary.model";

export class DiaryService {
  static getAllDiaryEntries = async (): Promise<Diary[]> => {
    const query = `    
      select df.diary_id, d.date, fid.id as food_id, fid.weight, fid.meal_type, fid.date_added 
      FROM diary_foods df
      INNER JOIN food_in_diary fid
	    ON df.food_id = fid.id
      INNER JOIN diary d 
    	ON df.diary_id = d.id;`;

    let rows = await db.all(query);

    let reduced = DiaryService.groupDiaryById(rows);

    return reduced;
  };

  static getAllDiaryEntriesByDate = async (date: string): Promise<Diary[]> => {
    const query = `    
      select df.diary_id, d.date, fid.id as food_id, fid.weight, fid.meal_type, fid.date_added 
      FROM diary_foods df
      INNER JOIN food_in_diary fid
	    ON df.food_id = fid.id
      INNER JOIN diary d 
    	ON df.diary_id = d.id
      WHERE d.date LIKE '%' || ? || '%'
      `;

    const rows = await db.all(query, [date]);
    const reduced = DiaryService.groupDiaryById(rows);
    return reduced;
  };

  static getDiaryEntryById = async (id: string): Promise<Diary> => {
    const query = `    
    select df.diary_id, d.date, fid.id as food_id, fid.weight, fid.meal_type, fid.date_added 
    FROM diary_foods df
    INNER JOIN food_in_diary fid
    ON df.food_id = fid.id
    INNER JOIN diary d 
    ON df.diary_id = d.id
    WHERE d.id LIKE '%' || ? || '%'
    `;

    let rows = await db.all<Diary>(query, [id]);
    return rows;
  };

  static addDiaryItem = async (): Promise<void> => {
    const query = `INSERT INTO diary (date) VALUES (Date('now'))`;

    await db.run(query);
  };

  static addFoodToDiary = async (foods: FoodInDiary[]) => {
    if (foods.length) {
      const lastDiaryItem = await db.get(
        `SELECT id FROM ${DIARY} ORDER BY id DESC LIMIT 1`
      );
      const rowId = await lastDiaryItem.id;

      foods.forEach(async (food: FoodInDiary) => {
        await db.run(
          `INSERT INTO ${FOOD_IN_DIARY}
           (id, weight, meal_type, date_added)   
           VALUES (?, ?, ?, datetime(CURRENT_TIMESTAMP, 'localtime'))`,
          [food.id, food.weight, food.mealType, food.dateAdded]
        );
        await db.run(
          `INSERT INTO ${DIARY_FOODS} (diary_id, food_id)
           VALUES (?, ?)`,
          [rowId, food.id]
        );
      });
    }
  };

  static addFoodsToExistingDiary = async (
    diaryId: string,
    foods: FoodInDiary[]
  ) => {
    foods.forEach(async (food: FoodInDiary) => {
      await db.run(
        `INSERT INTO ${FOOD_IN_DIARY}
       (id, weight, meal_type, date_added)   
       VALUES (?, ?, ?, datetime(CURRENT_TIMESTAMP, 'localtime'))`,
        [food.id, food.weight, food.mealType]
      );
      await db.run(
        `INSERT INTO ${DIARY_FOODS} (diary_id, food_id)
       VALUES (?, ?)`,
        [diaryId, food.id]
      );
    });
  };

  static deleteFoodFromDiary = async (diaryId: string, foodId: string) => {
    const query = `
    DELETE FROM diary_foods 
    WHERE diary_id = ? AND food_id = ?`;

    await db.run(query, [diaryId, foodId]);
    const deleteFoodInDiaryQuery = `DELETE FROM food_in_diary WHERE id = ?`;
    await db.run(deleteFoodInDiaryQuery, [foodId]);
  };

  static deleteDiaryItemById = async (id: string): Promise<any> => {
    const query = `
    DELETE FROM diary_foods WHERE diary_id = ?`;

    let rows = await db.run(query, [id]);
    return rows;
  };

  private static groupDiaryById(rows: any): Diary[] {
    return rows.reduce((acc: any, item: any) => {
      let { diary_id } = item;

      let foundIndex = acc.findIndex((item: any) => item.id === diary_id);

      if (foundIndex > -1) {
        acc[foundIndex].foods.push({
          id: item.food_id,
          weight: item.weight,
          mealType: item.meal_type,
          dateAdded: item.date_added,
        });
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
            },
          ],
        });
      }
      return acc;
    }, []);
  }
}
