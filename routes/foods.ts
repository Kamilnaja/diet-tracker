import express from "express";
import { Food } from "../food";
import { Error } from "../models/error";
import { IFoodEntity } from "../models/food.interface";
import { NutriScore } from "../models/nutri-score.enum";
import { IResponse } from "../models/response.interface";

const createFoods = (): IResponse<IFoodEntity[]> => {
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
  const orangeJuice = new Food()
    .setId(5)
    .setName("Orange juice")
    .setCaloriesPer100g(150)
    .setWeight(100)
    .getFood();

  const foods = [cottage, tomato, chicken, beef, orangeJuice];

  return {
    data: foods,
    length: foods.length,
  };
};

const initialFood = createFoods();
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
  let foundItem = initialFood.data.find((item) => item.id === Number(id));

  foundItem
    ? res.status(200).json(foundItem)
    : res.status(204).json(Error.getError("Item not found"));
});

router.post("/foods", (req, res) => {
  const { name, weight, caloriesPer100g, nutriScore } = req.body;

  if (!name || !weight) {
    return res
      .status(400)
      .json(Error.getError("Both name and weight are required"));
  }

  if (initialFood.data.find((item) => item.name === name)) {
    return res
      .status(409)
      .json(Error.getError("Food with this name already exists"));
  }

  const food = new Food()
    .setId(Math.floor(Math.random() * 1000))
    .setWeight(weight)
    .setCaloriesPer100g(caloriesPer100g)
    .setNutriScore(nutriScore)
    .setName(name);

  initialFood.data.push(food.getFood());
  initialFood.length++;

  res.status(200).json(food.getFood());
});

router.delete("/foods/:id", (req, res) => {
  const id = Number(req.params.id);
  let response: IResponse<IFoodEntity | undefined> = {
    data: undefined,
    length: 0,
  };

  let foundItem = initialFood.data.find((item) => item.id === Number(id));

  if (foundItem) {
    response = {
      data: foundItem,
      length: 1,
    };
    initialFood.data = initialFood.data.filter((item) => item.id !== id);
    initialFood.length = initialFood.length - 1;
  }
  res.send(response);
});

router.put("/foods/:id", (req, res) => {
  const id = Number(req.params.id);

  let foundItemIdx = initialFood.data.findIndex(
    (item) => item.id === Number(id)
  );

  if (foundItemIdx > -1) {
    const { body } = req;

    const itemToReplace: IFoodEntity = {
      id: id,
      name: body.name,
      weight: body.weight,
      caloriesPer100g: body.caloriesPer100g,
      nutriScore: body.nutriScore,
    };

    initialFood.data.splice(foundItemIdx, 1, itemToReplace);

    return res.status(201).send(req.body);
  }
  res.status(204).send(Error.getError("no id found"));
});
