import { createEmptyResponse } from "@shared/helpers/create-empty-response";
import { shouldLoadInitialData } from "@shared/helpers/utils";
import { FoodBuilder } from "../builders/food.builder";
import { FoodResponse } from "../models/food-response";
import { Food } from "../models/food.model";

const createFoods = (): Food[] => {
  const cottage = new FoodBuilder()
    .setId("1")
    .setName("Cottage Cheese")
    .setCaloriesPer100g(100)
    .setWeight(180)
    .setNutriScore("B")
    .setTags(["1", "2", "3"])
    .build();
  const tomato = new FoodBuilder()
    .setId("2")
    .setName("Tomato")
    .setCaloriesPer100g(40)
    .setWeight(100)
    .setNutriScore("A")
    .setTags(["2", "3"])
    .build();
  const chicken = new FoodBuilder()
    .setId("3")
    .setName("Chicken Breast")
    .setCaloriesPer100g(100)
    .setWeight(100)
    .setTags(["1"])
    .build();
  const beef = new FoodBuilder()
    .setId("4")
    .setName("Beef Steak")
    .setCaloriesPer100g(140)
    .setNutriScore("C")
    .setWeight(100)
    .setTags(["3"])
    .build();
  const orangeJuice = new FoodBuilder()
    .setId("5")
    .setName("Orange juice")
    .setCaloriesPer100g(150)
    .setWeight(100)
    .build();
  const beeHoney = new FoodBuilder()
    .setId("6")
    .setName("Bee Honey")
    .setCaloriesPer100g(350)
    .setWeight(100)
    .build();

  const foods = [cottage, tomato, chicken, beef, orangeJuice, beeHoney];

  return foods;
};

export const getInitialFoods = (): FoodResponse =>
  shouldLoadInitialData()
    ? new FoodResponse(createFoods())
    : createEmptyResponse();
