import { HttpResponse } from "@models/http-response.interface";
import { shouldLoadInitialData } from "@shared/utils";
import { FoodBuilder } from "../builders/food-builder";
import { Food } from "../models/food.interface";
import { NutriScore } from "../models/nutri-score.enum";

type Response = HttpResponse<Food[]>;

const createNonEmptyFoods = (): Response => {
  const cottage = new FoodBuilder()
    .setId("1")
    .setName("Cottage Cheese")
    .setCaloriesPer100g(100)
    .setWeight(180)
    .setNutriScore(NutriScore.B)
    .setTags(["1", "2", "3"])
    .getFood();
  const tomato = new FoodBuilder()
    .setId("2")
    .setName("Tomato")
    .setCaloriesPer100g(40)
    .setWeight(100)
    .setNutriScore(NutriScore.A)
    .setTags(["2", "3"])
    .getFood();
  const chicken = new FoodBuilder()
    .setId("3")
    .setName("Chicken Breast")
    .setCaloriesPer100g(100)
    .setWeight(100)
    .setTags(["1"])
    .getFood();
  const beef = new FoodBuilder()
    .setId("4")
    .setName("Beef Steak")
    .setCaloriesPer100g(140)
    .setNutriScore(NutriScore.C)
    .setWeight(100)
    .setTags(["3"])
    .getFood();
  const orangeJuice = new FoodBuilder()
    .setId("5")
    .setName("Orange juice")
    .setCaloriesPer100g(150)
    .setWeight(100)
    .getFood();
  const beeHoney = new FoodBuilder()
    .setId("6")
    .setName("Bee Honey")
    .setCaloriesPer100g(350)
    .setWeight(100)
    .getFood();

  const foods = [cottage, tomato, chicken, beef, orangeJuice, beeHoney];

  return {
    data: foods,
    length: foods.length,
  };
};

const createEmptyFoods = (): Response => {
  const foods: Food[] = [];
  return {
    data: foods,
    length: foods.length,
  };
};

export const getInitialFoods = (): Response =>
  shouldLoadInitialData() ? createNonEmptyFoods() : createEmptyFoods();
