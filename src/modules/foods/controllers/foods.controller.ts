import { Error } from "@models/error";
import { HttpResponse } from "@shared/models/http-response.model";
import { RESPONSE_CODES } from "@shared/models/response-codes.const";
import { NextFunction, Request, Response } from "express";
import { Food } from "../models/food.model";
import { FoodsService } from "../services/foods.service";

export const getFoods = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  /* 
    #swagger.tags = ['Foods']
    #swagger.description = 'Get all Foods'
    #swagger.parameters['name'] = {
      in: 'query',
      description: 'Food name',
      type: 'string'
    }
    #swagger.responses[200] = {
      description: 'Foods successfully obtained',
      schema: { $ref: '#/definitions/FoodResponse'}
    }
  */

  const { name } = req.query;
  if (name) {
    FoodsService.getAllFoodsByName(name as string, (rows: any) => {
      let response: HttpResponse<Food> = {
        data: rows,
        length: rows.length,
      };
      res.status(RESPONSE_CODES.OK).json(response);
    });
  } else {
    let rows = await FoodsService.getAllFoods();
    console.log(rows);
  }
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

  FoodsService.getFoodById(id, (row: any) => {
    if (!row) {
      return res
        .status(RESPONSE_CODES.NOT_FOUND)
        .send(Error.getError("No entry found"));
    }
    res.status(RESPONSE_CODES.OK).json(row);
  });
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
  const { name, weight, caloriesPer100g, nutriScore, tags = [] } = req.body;

  if (!name || !weight) {
    return res
      .status(RESPONSE_CODES.UNPROCESSABLE_ENTITY)
      .json(Error.getError("Both name and weight are required"));
  }

  FoodsService.addNewFood(
    {
      name,
      weight,
      caloriesPer100g,
      nutriScore,
      tags,
    },
    (row: any) => {
      res
        .status(RESPONSE_CODES.CREATED)
        .json({ name, weight, caloriesPer100g, nutriScore, tags });
    }
  );
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

  FoodsService.deleteFood(id, (row: any) => {
    if (!row) {
      return res.send(Error.getError("No entry found"));
    }
    res.status(RESPONSE_CODES.OK).json(row);
  });
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

  await FoodsService.editFood(id, body);
  return res.status(RESPONSE_CODES.CREATED).send(req.body);
};
