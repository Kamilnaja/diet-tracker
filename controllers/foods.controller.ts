import { Request, Response } from "express";
import { Food } from "../food";
import { createFoods } from "../helpers/create-foods";
import { Error } from "../models/error";
import { IFoodEntity } from "../models/food.interface";
import { IResponse } from "../models/response.interface";

const initialFood = createFoods();

export const getFoods = (req: Request, res: Response) => {
  const response = {
    ...initialFood,
    data: initialFood.data.map(({ nutriScore, ...keep }) => keep),
  };
  res.json(response);
};

export const getFoodById = (req: Request, res: Response) => {
  const id = Number(req);
  let foundItem = initialFood.data.find((item) => item.id === Number(id));

  foundItem
    ? res.status(200).json(foundItem)
    : res.status(204).json(Error.getError("Item not found"));
};

export const addNewFood = (req: Request, res: Response) => {
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
};

export const deleteFoodById = (req: Request, res: Response) => {
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
};

export const editFood = (req: Request, res: Response) => {
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
};
