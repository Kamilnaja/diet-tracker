const sqlite3 = require("sqlite3").verbose();
import { shouldLoadInitialData } from "@shared/helpers/utils";
import { open } from "sqlite";

const FOODS = "foods";
const TAGS = "tags";
const FOOD_TAGS = "food_tags";

export let db: any;

export const startDb = async () => {
  try {
    db = await open({
      filename: "test.db",
      driver: sqlite3.Database,
    });

    console.log("Database connection established!");

    await dropTables(db);
    await createTables(db);
    await loadInitialFoods(db);
  } catch (error) {
    console.error(error);
  }
};

async function loadInitialFoods(db: any) {
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
  } else {
    console.log("SKIPPING INITIAL DATA INSERTION");
  }
}

async function createTables(db: any) {
  const createFoodsTable = `CREATE TABLE IF NOT EXISTS ${FOODS} (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      caloriesPer100g INTEGER,
      weight INTEGER NOT NULL,
      nutriScore TEXT,
      meal_type TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP);`;

  await db
    .run(createFoodsTable)
    .then(() => console.log(`${FOODS} table has been created`))
    .catch((err: any) => console.error(err));

  await db
    .run(
      `CREATE TABLE IF NOT EXISTS ${TAGS} (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        tag_name TEXT UNIQUE NOT NULL
      );`
    )
    .then(() => console.log(`${TAGS} table has been created`))
    .catch((err: any) => console.error(err));

  await db
    .run(
      `CREATE TABLE IF NOT EXISTS ${FOOD_TAGS} (
        food_id INT NOT NULL,
        tag_id INT NOT NULL,
        PRIMARY KEY (food_id, tag_id),
        FOREIGN KEY (food_id) REFERENCES foods(food_id),
        FOREIGN KEY (tag_id) REFERENCES tags(tag_id)
      );`
    )
    .then(async () => {
      console.log(`${FOOD_TAGS} table has been created`);
    });
}

async function dropTables(db: any) {
  await db
    .run(`DROP TABLE IF EXISTS ${FOODS};`)
    .then(() => console.log(`${FOODS} table dropped;`));
  await db
    .run(`DROP TABLE IF EXISTS ${TAGS};`)
    .then(() => console.log(`${TAGS} table dropped;`));
  await db
    .run(`DROP TABLE IF EXISTS ${FOOD_TAGS};`)
    .then(() => console.log(`${FOOD_TAGS} table dropped;`));
}
