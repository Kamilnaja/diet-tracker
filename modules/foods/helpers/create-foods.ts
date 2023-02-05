import { Food } from "../builders/food";
import { NutriScore } from "../models/nutri-score.enum";

export const createFoods = () => {
  const cottage = new Food()
    .setId("1")
    .setName("Cottage Cheese")
    .setCaloriesPer100g(100)
    .setWeight(180)
    .setNutriScore(NutriScore.B)
    .getFood();
  const tomato = new Food()
    .setId("2")
    .setName("Tomato")
    .setCaloriesPer100g(40)
    .setWeight(100)
    .setNutriScore(NutriScore.A)
    .getFood();
  const chicken = new Food()
    .setId("3")
    .setName("Chicken Breast")
    .setCaloriesPer100g(100)
    .setWeight(100)
    .getFood();
  const beef = new Food()
    .setId("4")
    .setName("Beef Steak")
    .setCaloriesPer100g(140)
    .setNutriScore(NutriScore.C)
    .setWeight(100)
    .getFood();
  const orangeJuice = new Food()
    .setId("5")
    .setName("Orange juice")
    .setCaloriesPer100g(150)
    .setWeight(100)
    .getFood();
  const beeHoney = new Food()
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
