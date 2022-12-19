import { sequelize } from "./db";
import { Food } from "./models/food.model";
import { FoodCategory } from "./models/foodCategory.model";
import { Nutriscore } from "./models/NutriScore.model";

export const assertDatabaseConnectionOk = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (err) {
    console.log("unable to connect to the database:", err);
  }
};

export const initDb = async () => {
  [Nutriscore, Food, FoodCategory].forEach(async (item) => {
    await item.sync({ force: true });
  });
};
