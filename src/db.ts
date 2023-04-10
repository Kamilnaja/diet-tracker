import { shouldLoadInitialData } from "@shared/helpers/utils";

const sqlite3 = require("sqlite3").verbose();
const foods = "foods";
const tags = "tags";
const food_tags = "food_tags";

export let db = new sqlite3.Database("test.db", (err: any) => {
  if (err) {
    console.error(err.message);
  }
  console.log("Connected to the test database.");
  db.serialize(() => {
    db.run(`DROP TABLE IF EXISTS ${foods};`, (err: any) => {
      if (err) {
        console.error("Error dropping foods table:", err);
      } else {
        console.log("Foods table dropped successfully");
      }
    });
    db.run(`DROP TABLE IF EXISTS ${tags};`, (err: any) => {
      if (err) {
        console.error("Error dropping tags table:", err);
      } else {
        console.log("Tags table dropped successfully");
      }
    });
    db.run(`DROP TABLE IF EXISTS ${food_tags};`, (err: any) => {
      if (err) {
        console.error("Error dropping food_tags table:", err);
      } else {
        console.log("Food_tags table dropped successfully");
      }
    });

    const createFoodsTable = `CREATE TABLE IF NOT EXISTS ${foods} (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    caloriesPer100g INTEGER,
    weight INTEGER NOT NULL,
    nutriScore TEXT,
    meal_type TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP);`;

    db.run(createFoodsTable, (err: any) => {
      if (err) {
        console.error("Error creating foods table:", err);
      } else {
        console.log("Foods table created successfully");
      }
    });

    db.run(
      `CREATE TABLE IF NOT EXISTS ${tags} (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      tag_name TEXT UNIQUE NOT NULL
    );`,
      (err: any) => {
        if (err) {
          console.error("Error creating tags table:", err);
        } else {
          console.log("Tags table created successfully");
        }
      }
    );

    db.run(
      `CREATE TABLE IF NOT EXISTS ${food_tags} (
      food_id INT NOT NULL,
      tag_id INT NOT NULL,
      PRIMARY KEY (food_id, tag_id),
      FOREIGN KEY (food_id) REFERENCES foods(food_id),
      FOREIGN KEY (tag_id) REFERENCES tags(tag_id)
    );`,
      (err: any) => {
        if (err) {
          console.error("Error creating food_tags table:", err);
        } else {
          console.log("Food_tags table created successfully");
        }
      }
    );

    if (shouldLoadInitialData()) {
      db.run(
        `INSERT INTO ${foods} (name, weight, caloriesPer100g, nutriScore) VALUES
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
      `,
        (err: any) => {
          if (err) {
            console.error(
              "Error inserting initial data into foods table:",
              err
            );
          } else {
            console.log("Initial data inserted into foods table successfully");
          }
        }
      );

      db.run(
        `INSERT INTO ${tags} (tag_name) VALUES
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
      `,
        (err: any) => {
          if (err) {
            console.error("Error inserting initial data into tags table:", err);
          } else {
            console.log("Initial data inserted into tags table successfully");
          }
        }
      );
    } else {
      console.log("Initial data already loaded");
    }

    db.run(
      `INSERT INTO ${food_tags} (food_id, tag_id) VALUES
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
    `,
      (err: any) => {
        if (err) {
          console.error(
            "Error inserting initial data into food_tags table:",
            err
          );
        } else {
          console.log(
            "Initial data inserted into food_tags table successfully"
          );
        }
      }
    );
  });
});
