import { Error } from "@models/error";
import { Request, Response } from "express";
import { FoodBuilder } from "../builders/food-builder";
import { getInitialFoods } from "../helpers/create-foods";
import { Food, FoodListResponse } from "../models/food.interface";

const initialFoods = getInitialFoods();

export const getFoods = (req: Request, res: Response) => {
  // #swagger.tags = ['Foods']
  let searchBy = req.query?.name as string;
  searchBy = searchBy?.trim().toLocaleLowerCase();

  if (searchBy) {
    const filterFn = (item: Food) =>
      item.name?.toLocaleLowerCase().includes(searchBy);

    const results = initialFoods.filterByFn(filterFn);
  }

  res.json(initialFoods.getResponse);
};

export const getFoodById = (req: Request, res: Response) => {
  // #swagger.tags = ['Foods']
  const { id } = req.params;

  if (!id) {
    return res.send(Error.getError("No entry found"));
  }

  let foundItem = initialFoods.find("id", id);

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

  if (initialFoods.find("name", name)) {
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

  initialFoods.add(food.build());

  res.status(201).json(food);
};

export const deleteFoodById = (req: Request, res: Response) => {
  // #swagger.tags = ['Foods']
  const { id } = req.params;

  let response: FoodListResponse = {
    data: undefined,
    length: 0,
  };

  if (!id) {
    return res.send(Error.getError("No entry found"));
  }

  let foundItem = initialFoods.find("id", id);

  if (foundItem) {
    response = {
      data: foundItem,
      length: 1,
    };

    initialFoods.filter("id", id);
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
  const { id } = req.params;

  if (!id) {
    return res.send(Error.getError("No entry found"));
  }

  let foundItemId = initialFoods.find("id", id)?.id;

  if (!foundItemId) {
    return res.status(404).send(Error.getError("no id found"));
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

  initialFoods.replace(foundItemId, itemToReplace);

  return res.status(201).send(req.body);
};
