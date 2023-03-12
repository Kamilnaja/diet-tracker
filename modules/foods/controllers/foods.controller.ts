import { Error } from "@models/error";
import { Request, Response } from "express";
import {
  filterItemById,
  findItemById,
  findItemIdxById,
} from "../../helpers/array-helpers";
import { FoodBuilder } from "../builders/food-builder";
import { getInitialFoods } from "../helpers/create-foods";
import {
  Food,
  FoodListResponse,
  FoodListResponseAll,
} from "../models/food.interface";

const initialFoods = getInitialFoods();

export const getFoods = (req: Request, res: Response) => {
  // #swagger.tags = ['Foods']

  let searchBy = req.query?.name as string;
  searchBy = searchBy?.trim().toLocaleLowerCase();
  let response: FoodListResponseAll;

  if (searchBy) {
    const results = initialFoods.data.filter((item) =>
      item.name?.toLocaleLowerCase().includes(searchBy)
    );

    response = {
      data: results,
      length: results.length,
    };
  } else {
    response = {
      ...initialFoods,
      data: initialFoods.data,
    };
  }

  res.json(response);
};

export const getFoodById = (req: Request, res: Response) => {
  // #swagger.tags = ['Foods']
  const { id } = req.params;

  let foundItem = findItemById(id, initialFoods);

  foundItem
    ? res.status(200).json(foundItem)
    : res.status(204).json(Error.getError("Item not found"));
};

export const addNewFood = (req: Request, res: Response) => {
  // #swagger.tags = ['Foods']
  // #swagger.description = 'Add new Food'
  /*  #swagger.parameters['body'] = {
                in: 'body',
                description: 'Food Body',
                schema: {
                  $name: "Orange",
                  $weight: 100,
                  caloriesPer100g: 30,
                  id: "39393993",
                  tags: ["1", "2"]
                }
        } */
  const {
    name,
    weight,
    caloriesPer100g,
    nutriScore,
    id = new Date().getTime().toString(),
    tags = [],
  } = req.body;

  if (!name || !weight) {
    return res
      .status(400)
      .json(Error.getError("Both name and weight are required"));
  }

  if (initialFoods.data.find((item) => item.name === name)) {
    return res
      .status(409)
      .json(Error.getError("Food with this name already exists"));
  }

  const food = new FoodBuilder()
    .setId(id)
    .setWeight(weight)
    .setCaloriesPer100g(caloriesPer100g)
    .setNutriScore(nutriScore)
    .setName(name)
    .setTags(tags);

  initialFoods.data.push(food.getFood());
  initialFoods.length++;

  res.status(201).json(food);
};

export const deleteFoodById = (req: Request, res: Response) => {
  // #swagger.tags = ['Foods']
  const id = req.params.id;

  let response: FoodListResponse = {
    data: undefined,
    length: 0,
  };

  let foundItem = findItemById(id, initialFoods);

  if (foundItem) {
    response = {
      data: foundItem,
      length: 1,
    };

    initialFoods.data = filterItemById(id, initialFoods);
    initialFoods.length = initialFoods.length - 1;
  }
  res.status(foundItem ? 200 : 404).send(response);
};

export const editFood = (req: Request, res: Response) => {
  // #swagger.tags = ['Foods']
  /*  #swagger.parameters['body'] = {
                in: 'body',
                description: 'Food Body',
                schema: {
                  $name: "Orange",
                  $weight: 100,
                  caloriesPer100g: 30,
                  id: "39393993",
                  tags: ["1", "2"]
                }
        } */
  const id = req.params.id;

  let foundItemIdx = findItemIdxById(id, initialFoods);

  if (foundItemIdx > -1) {
    res.status(204).send(Error.getError("no id found"));
  }

  const { body } = req;

  const itemToReplace: Food = {
    id: id,
    name: body.name,
    weight: body.weight,
    caloriesPer100g: body.caloriesPer100g,
    nutriScore: body.nutriScore,
    tags: body.tags,
  };

  initialFoods.data.splice(foundItemIdx, 1, itemToReplace);

  return res.status(201).send(req.body);
};
