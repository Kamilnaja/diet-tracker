import { shouldLoadInitialData } from "@shared/helpers/utils";
import {
  DIARY,
  DIARY_FOODS,
  FOODS,
  FOOD_IN_DIARY,
  FOOD_TAGS,
  TAGS,
} from "./db-table-names";

export async function loadInitialFoods(db: any) {
  if (shouldLoadInitialData()) {
    await db
      .run(
        `INSERT INTO ${FOODS} (name, weight, caloriesPer100g, nutriScore) VALUES
          ('Apple', 100, 52, 'A'),
          ('Banana', 100, 89, 'B'),
          ('Orange', 100, 47, 'C'),
          ('Sausage', 100, 300, 'D'),
          ('Bread', 100, 250, 'E'),
          ('Milk', 100, 42, 'A'),
          ('Cheese', 100, 400, 'B'),
          ('Eggs', 100, 155, 'C'),
          ('Chicken', 100, 300, 'D'),
          ('Pork', 100, 250, 'E'),
          ('Beef', 100, 42, 'A'),
          ('Fish', 100, 400, 'B'),
          ('Rice', 100, 155, 'C'),
          ('Potatoes', 100, 300, 'D'),
          ('Tomatoes', 100, 250, 'E'),
          ('Onions', 100, 42, 'A'),
          ('Garlic', 100, 400, 'B'),
          ('Lettuce', 100, 155, 'C'),
          ('Cucumber', 100, 300, 'D'),
          ('Carrots', 100, 250, 'E'),
          ('Broccoli', 100, 42, 'A'),
          ('Spinach', 100, 400, 'B'),
          ('Cabbage', 100, 155, 'C'),
          ('Peas', 100, 300, 'D'),
          ('Beans', 100, 250, 'E'),
          ('Pasta', 100, 42, 'A'),
          ('Noodles', 100, 400, 'B'),
          ('Pizza', 100, 155, 'C'),
          ('Burger', 100, 300, 'D'),
          ('Fries', 100, 250, 'E'),
          ('Ice Cream', 100, 42, 'A'),
          ('Chocolate', 100, 400, 'B'),
          ('Candy', 100, 155, 'C'),
          ('Cake', 100, 300, 'D'),
          ('Cookies', 100, 250, 'E'),
          ('Coffee', 100, 42, 'A'),
          ('Tea', 100, 400, 'B'),
          ('Juice', 100, 155, 'C'),
          ('Water', 100, 300, 'D'),
          ('Soda', 100, 250, 'E'),
          ('Beer', 100, 42, 'A'),
          ('Wine', 100, 400, 'B'),
          ('Vodka', 100, 155, 'C'),
          ('Whiskey', 100, 300, 'D'),
          ('Rum', 100, 250, 'E'),
          ('Cigarettes', 100, 42, 'A')
          `
      )
      .then(() => {
        console.log("Initial data inserted into foods table successfully");
      })
      .catch((err: any) => console.error(err));

    await db
      .run(
        `INSERT INTO ${TAGS} (tag_name) VALUES
          ('Fruit'),
          ('Vegetable'),
          ('Meat'),
          ('Bread'),
          ('Dairy'),
          ('Egg'),
          ('Gluten'),
          ('Soy'),
          ('Nuts'),
          ('Peanuts'),
          ('Lactose'),
          ('Sugar'),
          ('Salt'),
          ('Alcohol'),
          ('Tobacco'),
          ('Other')
          `
      )
      .then(() => {
        console.log("Initial data inserted into tags table successfully");
      })
      .catch((err: any) => console.error(err));

    await db
      .run(
        `INSERT INTO ${FOOD_TAGS} (food_id, tag_id) VALUES
          (1, 1),
          (1, 2),
          (2, 1),
          (2, 2),
          (3, 1),
          (3, 2),
          (4, 3),
          (5, 4),
          (6, 5),
          (7, 5),
          (8, 3),
          (9, 3)
          `
      )
      .then(() => {
        console.log("Initial data inserted into food_tags table successfully");
      })
      .catch((err: any) => console.error(err));

    await db
      .run(
        `INSERT INTO ${DIARY} (date, id) VALUES 
          (Date('now'), 1),
          ('2021-01-02', 2), 
          ('2021-01-03', 3), 
          ('2021-01-04', 4), 
          ('2021-01-05', 5), 
          ('2021-02-05', 6)
          `
      )
      .then(() => {
        console.log("Initial data inserted into diary table successfully");
      })
      .catch((err: any) => console.error(err));

    await db
      .run(
        `INSERT INTO ${DIARY_FOODS} (diary_id, food_id) VALUES 
          (1, 1), 
          (1, 2), 
          (2, 3), 
          (3, 4), 
          (5, 1)`
      )
      .then(() => {
        console.log(
          "Initial data inserted into diary_foods table successfully"
        );
      })
      .catch((err: any) => console.error(err));

    await db.run(
      `INSERT INTO ${FOOD_IN_DIARY} (id, weight, meal_type, date_added) VALUES 
        (0, 50.0, 'breakfast', Date('now')),
        (1, 100.2, 'breakfast', '2021-01-01 18:47'),
        (2, 1000, 'dinner', '2021-01-01 12:20'),
        (3, 100.2, 'breakfast', '2021-01-02 13:30'),
        (4, 200.1, 'lunch', '2021-01-03 11:00'),
        (5, 300, 'dinner', '2021-01-04 18:00'),
        (6, 40, 'snack', '2021-01-05 20:00'),
        (7, 14, 'snack', '2022-01-05 20:00'),
        (8, 10, 'snack', '2021-01-05 20:10'),
        (9, 4.3, 'snack', '2021-01-06 20:30')
        `
    );
  } else {
    console.log("💣💣TESTING - SKIPPING INITIAL DATA INSERTION💣💣");
  }
}
