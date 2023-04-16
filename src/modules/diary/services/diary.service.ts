import { db } from "@db/db";

export class DiaryService {
  static getAllDiaryEntries = async () => {
    const query = `    
      select df.diary_id, d.date, fid.id as food_id, fid.weight, fid.meal_type, fid.date_added 
      FROM diary_foods df
      INNER JOIN food_in_diary fid
	    ON df.food_id = fid.id
      INNER JOIN diary d 
    	ON df.diary_id = d.id;`;

    let rows = await db.all(query);

    let reduced = rows.reduce((acc: any, item: any) => {
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
    return reduced;
  };

  static getAllDiaryEntriesByDate() {}
}
