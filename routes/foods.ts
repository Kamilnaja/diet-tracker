import express from "express";
import { Food } from "../models/food";
import { IFood } from "../models/food.interface";
import { IResponse } from "../models/response.interface";

const createFoods = (): IResponse<IFood[]> => {
  const cottage = new Food("Cottage Cheese", 180, 100, 1).food;
  const tomato = new Food("Tomato", 100, 50, 2).food;
  const chicken = new Food("Chicken", 100, 50).food;
  const beef = new Food("Chicken", 100, 50).food;

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
  const response = initialFood;
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
