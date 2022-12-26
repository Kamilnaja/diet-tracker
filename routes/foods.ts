import express from "express";
import { Food } from "../food";
import { IFood } from "../models/food.interface";
import { NutriScore } from "../models/nutri-score.enum";
import { IResponse } from "../models/response.interface";

const createFoods = (): IResponse<IFood[]> => {
  const cottage = new Food()
    .setId(1)
    .setName("Cottage Cheese")
    .setCaloriesPer100g(100)
    .setWeight(180)
    .setNutriScore(NutriScore.B)
    .getFood();
  const tomato = new Food()
    .setId(2)
    .setName("Tomato")
    .setCaloriesPer100g(40)
    .setWeight(100)
    .setNutriScore(NutriScore.A)
    .getFood();
  const chicken = new Food()
    .setId(3)
    .setName("Chicken Breast")
    .setCaloriesPer100g(100)
    .setWeight(100)
    .getFood();
  const beef = new Food()
    .setId(4)
    .setName("Beef Steak")
    .setCaloriesPer100g(140)
    .setNutriScore(NutriScore.C)
    .setWeight(100)
    .getFood();

  const foods = [cottage, tomato, chicken, beef];

  return {
    data: foods,
    length: foods.length,
  };
};

let initialFood = createFoods();
export const router = express.Router();

router.get("/", (req, res) => {
  res.send("Express + TypeScript Server");
});

router.get("/foods", (req, res) => {
  const response = {
    ...initialFood,
    data: initialFood.data.map(({ nutriScore, ...keep }) => keep),
  };
  res.json(response);
});

router.get("/foods/:id", (req, res) => {
  const id = Number(req.params.id);
  let response: IResponse<IFood | undefined> = {
    data: undefined,
    length: 0,
  };

  let foundItem = initialFood.data.find((item) => item.id === Number(id));

  if (foundItem) {
    response = {
      data: foundItem,
      length: 1,
    };
  }
  res.json(response);
});

router.delete("/foods/:id", (req, res) => {
  const id = Number(req.params.id);
  let response: IResponse<IFood | undefined> = {
    data: undefined,
    length: 0,
  };

  let foundItem = initialFood.data.find((item) => item.id === Number(id));

  if (foundItem) {
    response = {
      data: foundItem,
      length: 1,
    };
    initialFood = {
      data: initialFood.data.filter((item) => item.id !== id),
      length: initialFood.length - 1,
    };
  }
  res.send(response);
});
