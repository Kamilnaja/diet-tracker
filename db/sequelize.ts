import { Sequelize } from "sequelize";
import { Food } from "./models/Food";
import { FoodCategory } from "./models/FoodCategory";

export const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./db/db.sqlite",
});

export async function runSequelize() {
  try {
    await sequelize.authenticate();
    await syncModels();
  } catch (err) {
    console.log("unable to connect to the database:", err);
  }
}

export async function syncModels() {
  [Food, FoodCategory].forEach((model) => {
    model.sync({ force: true });
  });
}
