import { Request, Response } from "express";
import { FoodBuilder } from "../builders/food";
import { getInitialFoods } from "../helpers/create-foods";
import { Error } from "../../shared/models/error";
import { IFood } from "../models/food.interface";
import { IResponse } from "../../shared/models/response.interface";

const initialFood = getInitialFoods();

export const getFoods = (req: Request, res: Response) => {
  // #swagger.tags = ['Foods']

  let searchBy = req.query?.name as string;
  searchBy = searchBy?.trim().toLocaleLowerCase();
  let response: IResponse<IFood[]>;

  if (searchBy) {
    const results = initialFood.data.filter((item) =>
      item.name?.toLocaleLowerCase().includes(searchBy)
    );

    response = {
      data: results,
      length: results.length,
    };
  } else {
    response = {
      ...initialFood,
      data: initialFood.data,
    };
  }

  res.json(response);
};

export const getFoodById = (req: Request, res: Response) => {
  // #swagger.tags = ['Foods']

  const { id } = req.params;
  let foundItem = initialFood.data.find((item) => item.id === String(id));

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

  if (initialFood.data.find((item) => item.name === name)) {
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

  initialFood.data.push(food.getFood());
  initialFood.length++;

  res.status(201).json(food);
};

export const deleteFoodById = (req: Request, res: Response) => {
  // #swagger.tags = ['Foods']

  const id = req.params.id;
  let response: IResponse<IFood | undefined> = {
    data: undefined,
    length: 0,
  };

  let foundItem = initialFood.data.find((item) => item.id === id);

  if (foundItem) {
    response = {
      data: foundItem,
      length: 1,
    };

    initialFood.data = initialFood.data.filter((item) => item.id !== id);
    initialFood.length = initialFood.length - 1;
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
    tags: body.tags,
  };

  initialFood.data.splice(foundItemIdx, 1, itemToReplace);

  return res.status(201).send(req.body);
};
