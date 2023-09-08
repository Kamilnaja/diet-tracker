import { shouldLoadInitialData } from "@shared/helpers/utils";
import { db } from "./db";
import { tables } from "./db-table-names";

export async function loadInitialData(): Promise<void> {
  if (shouldLoadInitialData()) {
    await addInitialFoods();
    await addInitialTags();
    await addInitialFoodTags();
    await addInitialFoodsInDiary();
    await addInitialDiaryFoods();
    await addInitialDiaryEntries();
    await addInitialUsers();
    await addWeights();
    console.log("🌵🔥🐍 LETS ROCK 🐍🔥🐘");
  } else {
    await addInitialTags();
    console.log("💣🧪 TESTING - SKIPPING INITIAL DATA INSERTION 🧪💣");
  }
}

async function addInitialFoodsInDiary(): Promise<void> {
  await db.run(
    `INSERT INTO ${tables.FOOD_IN_DIARY} (id, food_id, weight, meal_type, date_added) VALUES 
        (1, 1, 100.2, 'breakfast',  Date('now')),
        (2, 1, 1000, 'dinner',  Date('now')),
        (3, 1, 100.2, 'breakfast',  Date('now')),
        (4, 1, 200.1, 'lunch', '2021-01-03 11:00'),
        (5, 2, 300, 'dinner', '2021-01-04 18:00'),
        (6, 3, 40, 'snack', '2021-01-05 20:00'),
        (7, 4, 14, 'snack', '2022-01-05 20:00'),
        (8, 3, 10, 'snack', '2021-01-05 20:10'),
        (9, 1, 4.3, 'snack', '2021-01-06 20:30')
        `
  );
}

async function addInitialDiaryFoods(): Promise<void> {
  await db
    .run(
      `INSERT INTO ${tables.DIARY_FOODS} (diary_id, food_id) VALUES 
          (1, 1), 
          (1, 2), 
          (2, 3), 
          (3, 4), 
          (5, 5)`
    )
    .then(() => {
      console.log(
        "🚚 Initial data inserted into diary_foods table successfully 🐘"
      );
    })
    .catch((err: Error) => console.error(err));
}

async function addInitialDiaryEntries(): Promise<void> {
  await db
    .run(
      `INSERT INTO ${tables.DIARY} (date, id) VALUES 
          (Date('now'), 1),
          ('2021-01-02', 2), 
          ('2021-01-03', 3), 
          ('2021-01-04', 4), 
          ('2021-01-05', 5), 
          ('2021-02-05', 6)
          `
    )
    .then(() => {
      console.log("🚚 Initial data inserted into diary table successfully 💰");
    })
    .catch((err: Error) => console.error(err));
}

async function addInitialFoodTags(): Promise<void> {
  await db
    .run(
      `INSERT INTO ${tables.FOOD_TAGS} (food_id, tag_id) VALUES
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
      console.log(
        "🚚 Initial data inserted into food_tags table successfully 🚚"
      );
    })
    .catch((err: Error) => console.error(err));
}

async function addInitialTags(): Promise<void> {
  await db
    .run(
      `INSERT INTO ${tables.TAGS} (tag_name) VALUES
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
      console.log("🚚 Initial data inserted into tags table successfully 🚚");
    })
    .catch((err: Error) => console.error(err));
}

async function addInitialFoods(): Promise<void> {
  await db
    .run(
      `INSERT INTO ${tables.FOODS} (name, weight, caloriesPer100g, nutriScore, photo) VALUES
          ('Apple', 100, 52, 'A', 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Red_Apple.jpg/440px-Red_Apple.jpg'),
          ('Banana', 100, 89, 'B', 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Bananas.jpg/1024px-Bananas.jpg'),
          ('Orange', 100, 47, 'C', 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Orange-Whole-%26-Split.jpg/440px-Orange-Whole-%26-Split.jpg'),
          ('Sausage', 100, 300, 'D', 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/RedDot_Bologna.jpg/440px-RedDot_Bologna.jpg'),
          ('Bread', 100, 250, 'E', 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/White_Bread-1.jpg/440px-White_Bread-1.jpg'),
          ('Milk', 100, 42, 'A', 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/2_percent_milk_glass.jpg/440px-2_percent_milk_glass.jpg'),
          ('Cheese', 100, 400, 'B', 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Swiss_cheese_cubes.jpg/440px-Swiss_cheese_cubes.jpg'),
          ('Eggs', 100, 155, 'C', 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Brown_chicken_egg.jpg/440px-Brown_chicken_egg.jpg'),
          ('Chicken', 100, 300, 'D', 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Chicken_family.jpg/480px-Chicken_family.jpg'),
          ('Pork', 100, 250, 'E', 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/NCI_clove_ham.jpg/440px-NCI_clove_ham.jpg'),
          ('Beef', 100, 42, 'A', 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/2nd_June_2012_Lamb_Steak_1.jpg/440px-2nd_June_2012_Lamb_Steak_1.jpg'),
          ('Fish', 100, 400, 'B', 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/Red_Snapper_-_USDA.jpg/440px-Red_Snapper_-_USDA.jpg'),
          ('Rice', 100, 155, 'C', 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Uncooked_rice.jpg/440px-Uncooked_rice.jpg'),
          ('Potatoes', 100, 300, 'D', 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/Patates.jpg/440px-Patates.jpg'),
          ('Tomatoes', 100, 250, 'A', 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Bright_red_tomato_and_cross_section02.jpg/440px-Bright_red_tomato_and_cross_section02.jpg'),
          ('Onions', 100, 42, 'A', 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1c/Onion_growing_flower_bolts.jpg/440px-Onion_growing_flower_bolts.jpg'),
          ('Garlic', 100, 400, 'B', 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Garlic_bulbs_and_individual_clove.jpg/440px-Garlic_bulbs_and_individual_clove.jpg'),
          ('Lettuce', 100, 155, 'C', 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Lactuca_sativa_-_K%C3%B6hler%E2%80%93s_Medizinal-Pflanzen-109.jpg/440px-Lactuca_sativa_-_K%C3%B6hler%E2%80%93s_Medizinal-Pflanzen-109.jpg'),
          ('Cucumber', 100, 300, 'D', 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/32/Cucumbers.jpg/440px-Cucumbers.jpg'),
          ('Carrots', 100, 250, 'E', 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Carrots.jpg/440px-Carrots.jpg'),
          ('Broccoli', 100, 42, 'A', 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/03/Broccoli_and_cross_section_edit.jpg/440px-Broccoli_and_cross_section_edit.jpg'),
          ('Spinach', 100, 400, 'B', 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Spinach-leaves.jpg/440px-Spinach-leaves.jpg'),
          ('Cabbage', 100, 155, 'C', 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Brassica_oleracea_Capitata_Group_-_K%C3%B6hler%E2%80%93s_Medizinal-Pflanzen-027.jpg/440px-Brassica_oleracea_Capitata_Group_-_K%C3%B6hler%E2%80%93s_Medizinal-Pflanzen-027.jpg'),
          ('Peas', 100, 300, 'D', 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Peas_in_pods_-_Studio.jpg/440px-Peas_in_pods_-_Studio.jpg'),
          ('Beans', 100, 250, 'E', 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Phaseolus_vulgaris_-_K%C3%B6hler%E2%80%93s_Medizinal-Pflanzen-263.jpg/440px-Phaseolus_vulgaris_-_K%C3%B6hler%E2%80%93s_Medizinal-Pflanzen-263.jpg'),
          ('Pasta', 100, 42, 'A', 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Spaghetti-precooked.jpg/440px-Spaghetti-precooked.jpg'),
          ('Noodles', 100, 400, 'B', 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/Uncooked_Ramen.jpg/440px-Uncooked_Ramen.jpg'),
          ('Pizza', 100, 155, 'C', 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/Eq_it-na_pizza-margherita_sep2005_sml.jpg/440px-Eq_it-na_pizza-margherita_sep2005_sml.jpg'),
          ('Burger', 100, 300, 'D', 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/RedDot_Burger.jpg/440px-RedDot_Burger.jpg'),
          ('Fries', 100, 250, 'E', 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/Fries_2.jpg/440px-Fries_2.jpg'),
          ('Ice Cream', 100, 42, 'A', 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/31/Ice_Cream_dessert_02.jpg/440px-Ice_Cream_dessert_02.jpg'),
          ('Chocolate', 100, 400, 'B', 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/Chocolate_%28blue_background%29.jpg/440px-Chocolate_%28blue_background%29.jpg'),
          ('Candy', 100, 155, 'C', 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Candy_in_Damascus.jpg/440px-Candy_in_Damascus.jpg'),
          ('Cake', 100, 300, 'D', 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Chocolate_cake.jpg/440px-Chocolate_cake.jpg'),
          ('Cookies', 100, 250, 'E', 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/2ChocolateChipCookies.jpg/440px-2ChocolateChipCookies.jpg'),
          ('Coffee', 100, 42, 'A', 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/A_small_cup_of_coffee.JPG/440px-A_small_cup_of_coffee.JPG'),
          ('Tea', 100, 400, 'B', 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/Tea_leaves_steeping_in_a_zhong_%28gaiwan%29.jpg/440px-Tea_leaves_steeping_in_a_zhong_%28gaiwan%29.jpg'),
          ('Juice', 100, 155, 'C', 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Orange_juice_1_edit1.jpg/440px-Orange_juice_1_edit1.jpg'),
          ('Water', 100, 300, 'D', 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Drinking_fountain%2C_Toronto.jpg/440px-Drinking_fountain%2C_Toronto.jpg'),
          ('Soda', 100, 250, 'E', 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Two_glasses_of_Coca-Cola.JPG/440px-Two_glasses_of_Coca-Cola.JPG'),
          ('Beer', 100, 42, 'A', 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/32/A_bottle_of_Beer.jpg/440px-A_bottle_of_Beer.jpg'),
          ('Wine', 100, 400, 'B', 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Red_Wine_Glass.jpg/440px-Red_Wine_Glass.jpg'),
          ('Vodka', 100, 155, 'C', 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7f/Vodka.jpg/440px-Vodka.jpg'),
          ('Whiskey', 100, 300, 'D', 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Glenfiddich_Special_Old_Reserve.jpg/440px-Glenfiddich_Special_Old_Reserve.jpg'),
          ('Rum', 100, 250, 'E', 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Rum_bottles.jpg/440px-Rum_bottles.jpg'),
          ('Cigarettes', 100, 42, 'A', 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Cigarettes_IMG_0509.JPG/440px-Cigarettes_IMG_0509.JPG')
          `
    )
    .then(() => {
      console.log("🚚 Initial data inserted into foods table successfully 🚚");
    })
    .catch((err: Error) => console.error(err));
}

async function addInitialUsers(): Promise<void> {
  await db
    .run(
      `INSERT INTO ${tables.USERS} (username, password, email) VALUES
        ('admin', '$2b$08$YyPyXYJPRCf5HBevYuM2fekSVAWxmN2zzqV4OqOcNJZsh7m6gZKU.', 'admin@gmail.com'),
        ('user', 'user', 'user@gmail.com')
      `
    )
    .then(() => {
      console.log(
        `🐘 Initial data inserted into ${tables.USERS} table successfully 🐘`
      );
    })
    .catch((err: Error) => console.warn(err));
}

async function addWeights(): Promise<void> {
  await db
    .run(
      `INSERT INTO ${tables.WEIGHTS} (weight, date) VALUES
        (70, '2021-01-01'),
        (90, '2021-01-02'),
        (82, '2021-01-03'),
        (74, '2021-01-04'),
        (66, '2021-01-05'),
        (53, '2024-01-06'),
        (49, '2021-01-07'),
        (45, '2021-01-08'),
        (73, '2022-01-06'),
        (89, '2023-01-07'),
        (55, '2022-01-08')
    `
    )
    .then(() => {
      console.log(
        `♻️ Initial data inserted into ${tables.WEIGHTS} table successfully ♻️`
      );
    })
    .catch((err: Error) => console.warn(`${tables.WEIGHTS} - ${err}`));
}
