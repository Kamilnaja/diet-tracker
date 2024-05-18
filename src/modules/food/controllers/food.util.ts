import { Food, FoodDb } from "../models/food.model";

export const mapFoodDbToFood = (food: FoodDb): Food => ({
  ...food,
  tags: food.tags ? food.tags.split(",") : [],
});
