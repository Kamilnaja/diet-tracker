import { Request, Response } from "express";
import { Food } from "../builders/food";
import { createFoods } from "../helpers/create-foods";
import { Error } from "../models/error";
import { IFood } from "../models/food.interface";
import { IResponse } from "../models/response.interface";

const initialFood = createFoods();

export const getFoods = (req: Request, res: Response) => {
  let searchBy = req.query?.name as string;
  searchBy = searchBy?.trim().toLocaleLowerCase();
  let response: IResponse<IFood[]>;

  if (searchBy) {
    const results = initialFood.data
      .filter((item) => item.name.toLocaleLowerCase().includes(searchBy))
      .map(({ nutriScore, ...keep }) => keep);

    response = {
      data: results,
      length: results.length,
    };
  } else {
    response = {
      ...initialFood,
      data: initialFood.data.map(({ nutriScore, ...keep }) => keep),
    };
  }

  res.json(response);
};

export const getFoodById = (req: Request, res: Response) => {
  const { id } = req.params;
  let foundItem = initialFood.data.find((item) => item.id === String(id));

  foundItem
    ? res.status(200).json(foundItem)
    : res.status(204).json(Error.getError("Item not found"));
};

export const addNewFood = (req: Request, res: Response) => {
  const {
    name,
    weight,
    caloriesPer100g,
    nutriScore,
    id = new Date().getTime().toString(),
  } = req.body;

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
    .setId(id)
    .setWeight(weight)
    .setCaloriesPer100g(caloriesPer100g)
    .setNutriScore(nutriScore)
    .setName(name);

  initialFood.data.push(food.getFood());
  initialFood.length++;

  res.status(201).json(food);
};

export const deleteFoodById = (req: Request, res: Response) => {
  const id = Number(req.params.id);
  let response: IResponse<IFood | undefined> = {
    data: undefined,
    length: 0,
  };

  let foundItem = initialFood.data.find((item) => item.id === String(id));

  if (foundItem) {
    response = {
      data: foundItem,
      length: 1,
    };
    initialFood.data = initialFood.data.filter(
      (item) => item.id !== String(id)
    );
    initialFood.length = initialFood.length - 1;
  }
  res.send(response);
};

export const editFood = (req: Request, res: Response) => {
  const id = req.params.id;

  let foundItemIdx = initialFood.data.findIndex((item) => item.id === id);

  if (foundItemIdx > -1) {
    res.status(204).send(Error.getError("no id found"));
  }

  const { body } = req;

  const itemToReplace: IFood = {
    id: id,
    name: body.name,
    weight: body.weight,
    caloriesPer100g: body.caloriesPer100g,
    nutriScore: body.nutriScore,
  };

  initialFood.data.splice(foundItemIdx, 1, itemToReplace);

  return res.status(201).send(req.body);
};
