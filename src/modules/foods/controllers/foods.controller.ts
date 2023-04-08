import { Error } from "@models/error";
import { RESPONSE_CODES } from "@shared/models/response-codes.const";
import { store } from "@shared/store";
import { Request, Response } from "express";
import { FoodBuilder } from "../builders/food.builder";
import { Food } from "../models/food.model";

export const getFoods = (req: Request, res: Response) => {
  /* 
    #swagger.tags = ['Foods']
    #swagger.description = 'Get all Foods'
   #swagger.parameters['name'] = {
      in: 'query',
      description: 'Search by name',
      required: false,
      type: 'string'
   }
   #swagger.parameters['tags'] = {
      in: 'query',
      description: 'Search by tags',
      required: false,
      type: 'array'
   }
    #swagger.responses[200] = {
      description: 'Foods successfully obtained',
      schema: { $ref: '#/definitions/FoodResponse'}
    }
  */

  filterFoodsByName(req);

  let tags = req.query?.tags as string[];
  tags = tags?.map((tag) => tag.trim().toLocaleLowerCase());

  if (tags) {
    const filterFn = (item: Food) =>
      item.tags?.some((tag) => tags.includes(tag));
    store.initialFoods.filterByFn(filterFn);
  }

  res.json(store.initialFoods.getResponse);
};

export const getFoodById = (req: Request, res: Response) => {
  /* 
    #swagger.tags = ['Foods'] 
    #swagger.description = 'Get Food by ID'
    #swagger.responses[200] = {
      description: 'Food successfully obtained',
      schema: { $ref: '#/definitions/FoodEntry' }
     }
     #swagger.responses[404] = {
      description: 'No such item',
      schema: { $ref: '#/definitions/ErrorSearch' }
     }
  */
  const { id } = req.params;

  if (!id) {
    return res.send(Error.getError("No entry found"));
  }

  let foundItem = store.initialFoods.find("id", id);

  foundItem
    ? res.status(RESPONSE_CODES.OK).json(foundItem)
    : res
        .status(RESPONSE_CODES.NOT_FOUND)
        .json(Error.getError("Item not found"));
};

export const addNewFood = (req: Request, res: Response) => {
  /*
    #swagger.tags = ['Foods']
    #swagger.description = 'Add new Food'
    #swagger.parameters['body'] = {
                in: 'body',
                description: 'Food Body',
                schema: {
                  $ref: '#/definitions/FoodEntry'
                }
        } 

    #swagger.responses[200] = {
      description: 'Success when adding new food',
      schema: { $ref: '#/definitions/FoodEntry' }
     }
  */
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
      .status(RESPONSE_CODES.UNPROCESSABLE_ENTITY)
      .json(Error.getError("Both name and weight are required"));
  }

  if (store.initialFoods.find("name", name)) {
    return res
      .status(RESPONSE_CODES.CONFLICT)
      .json(Error.getError("Food with this name already exists"));
  }

  const newFood = new FoodBuilder()
    .setId(id)
    .setWeight(weight)
    .setCaloriesPer100g(caloriesPer100g)
    .setNutriScore(nutriScore)
    .setName(name)
    .setTags(tags)
    .build();

  store.initialFoods.add(newFood);

  res.status(RESPONSE_CODES.CREATED).json(newFood);
};

export const deleteFoodById = (req: Request, res: Response) => {
  /* 
  #swagger.tags = ['Foods']
  #swagger.responses[200] = {
    description: 'Item deleted successfully',
    schema: { 
      $ref: '#/definitions/FoodEntry' 
    }
  }
  #swagger.responses[404] = {
    description: 'Item not found',
    schema: { 
      $ref: '#/definitions/ErrorSearch' 
    }
  }  
  */
  const { id } = req.params;

  if (!id) {
    return res.send(Error.getError("No entry found"));
  }

  let foundItem = store.initialFoods.find("id", id);

  if (foundItem) {
    store.initialFoods.filter("id", id);
  }
  res
    .status(foundItem ? RESPONSE_CODES.OK : RESPONSE_CODES.NOT_FOUND)
    .send(foundItem);
};

export const editFood = (req: Request, res: Response) => {
  /*  #swagger.tags = ['Foods']
      #swagger.parameters['body'] = {
                in: 'body',
                description: 'Food Body',
                schema: {
                  $ref: '#/definitions/FoodEntry'
                }
        }
      #swagger.responses[201] = {
        description: 'Success when editing food',
        schema: { $ref: '#/definitions/FoodEntry' }
    }
      #swagger.responses[404] = {
        description: 'No such item',
        schema: { $ref: '#/definitions/ErrorSearch' }
    }
  */
  const { id } = req.params;

  if (!id) {
    return res.send(Error.getError("No entry found"));
  }

  let foundItemId = store.initialFoods.find("id", id)?.id;

  if (!foundItemId) {
    return res
      .status(RESPONSE_CODES.NOT_FOUND)
      .send(Error.getError("No such item"));
  }

  const { body } = req;

  const itemToReplace: Food = {
    id: id,
    name: body.name,
    weight: body.weight,
    caloriesPer100g: body.caloriesPer100g,
    nutriScore: body.nutriScore,
    tags: body.tags,
    mealType: body.mealType,
  };

  store.initialFoods.replace(foundItemId, itemToReplace);

  return res.status(RESPONSE_CODES.CREATED).send(req.body);
};
function filterFoodsByName(req: Request) {
  let name = req.query?.name as string;
  name = name?.trim().toLocaleLowerCase();

  if (!name) {
    store.initialFoods.reset();
  } else {
    const filterFn = (item: Food) =>
      item.name?.toLocaleLowerCase().includes(name);

    store.initialFoods.filterByFn(filterFn);
  }
}
