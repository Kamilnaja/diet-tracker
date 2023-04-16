import { db } from "@db/db";
import { DIARY_FOODS, FOOD_IN_DIARY } from "@db/db-table-names";
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

  static addDiaryItem = async (date: string): Promise<Diary> => {
    const query = `
    INSERT INTO diary (date) VALUES (?)`;

    let rows = await db.run(query, [date]);
    return rows as any;
  };

  static addFoodToDiary = async (foods: FoodInDiary[]) => {
    if (foods.length) {
      const lastDiaryItem = await db.get(
        "SELECT id FROM ${diary} ORDER BY id DESC LIMIT 1"
      );
      const rowId = lastDiaryItem.id;

      foods.forEach(async (food) => {
        await db.run(
          `INSERT INTO ${FOOD_IN_DIARY} (weight, meal_type, date_added) VALUES (?, ?, ?)`,
          [food.weight, food.mealType, food.dateAdded]
        );
        await db.run(
          `INSERT INTO ${DIARY_FOODS} (diary_id, food_id) VALUES (?, ?)`,
          [rowId, food.id]
        );
      });
    }
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
