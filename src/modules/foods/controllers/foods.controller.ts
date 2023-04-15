import { Error } from "@models/error";
import { HttpResponse } from "@shared/models/http-response.model";
import { RESPONSE_CODES } from "@shared/models/response-codes.const";
import { Request, Response } from "express";
import { Food } from "../models/food.model";
import { FoodsService } from "../services/foods.service";

export const getFoods = async (req: Request, res: Response) => {
  /*
    #swagger.tags = ['Foods']
    #swagger.description = 'Get all Foods'
    #swagger.parameters['name'] = {
      in: 'query',
      description: 'Food name',
      required: false,
      type: 'string'
    }
  */

  const { name } = req.query;
  let rows = name
    ? await FoodsService.getAllFoodsByName(name as string)
    : await FoodsService.getAllFoods();

  if (!rows) {
    return rows
      .status(RESPONSE_CODES.NOT_FOUND)
      .send(Error.getError("No entry found"));
  }
  let response: HttpResponse<Food> = {
    data: rows,
    length: rows.length,
  };

  res.status(RESPONSE_CODES.OK).json(response);
};

export const getFoodById = async (req: Request, res: Response) => {
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

  await FoodsService.getFoodById(id).then((row: any) => {
    if (row) {
      res.status(RESPONSE_CODES.OK).json(row);
    } else {
      res
        .status(RESPONSE_CODES.NOT_FOUND)
        .json(Error.getError("No entry found"));
    }
  });
};

export const addNewFood = async (req: Request, res: Response) => {
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
  const { name, weight, caloriesPer100g, nutriScore, tags = [] } = req.body;

  if (!name || !weight) {
    return res
      .status(RESPONSE_CODES.UNPROCESSABLE_ENTITY)
      .json(Error.getError("Both name and weight are required"));
  }

  await FoodsService.addNewFood({
    name,
    weight,
    caloriesPer100g,
    nutriScore,
    tags,
  }).catch((err: any) => {
    res.status(RESPONSE_CODES.BAD_REQUEST).json(Error.getError(err));
  });

  await FoodsService.addTags(tags);
  const response = {
    data: {
      name,
      weight,
      caloriesPer100g,
      nutriScore,
      tags,
    },
  };

  res.status(RESPONSE_CODES.OK).json(response);
};

export const deleteFoodById = async (req: Request, res: Response) => {
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

  await FoodsService.deleteFood(id).catch((err: any) => {
    res.status(RESPONSE_CODES.NOT_FOUND).json(Error.getError("Item not found"));
  });
  res.status(RESPONSE_CODES.OK).json({ message: "Item deleted successfully" });
};

export const editFood = async (req: Request, res: Response) => {
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

  const { body } = req;

  await FoodsService.editFood(id, body)
    .then((row: any) => {
      res.status(RESPONSE_CODES.CREATED).json(row);
    })
    .catch((err: any) => {
      res.status(RESPONSE_CODES.NOT_FOUND).json(err);
    });
};
