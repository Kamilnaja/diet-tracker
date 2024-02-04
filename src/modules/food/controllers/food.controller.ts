import { Error } from "@models/error";
import { HttpResponse } from "@shared/models/http-response.model";
import { RESPONSE_CODES } from "@shared/models/response-codes.const";
import { NextFunction, Request, Response } from "express";
import { Food } from "../models/food.model";
import { FoodService } from "../services/food.service";

export const getFood = async (req: Request, res: Response): Promise<void> => {
  /*
    #swagger.auto = false
    #swagger.tags = ['Food']
    #swagger.description = 'Get all Food'
    #swagger.parameters['name'] = {
      in: 'query',
      description: 'Food name',
      required: false,
      type: 'string'
    }
    #swagger.responses[200] = {
      description: 'Food successfully obtained',
      schema: { $ref: '#/definitions/FoodResponse'}
    }
  */

  const { name } = req.query;
  const rows = name
    ? await FoodService.getAllFoodByName(name as string)
    : await FoodService.getAllFood();

  const response: HttpResponse<Food[]> = {
    data: rows,
    length: rows.length,
  };

  res.status(RESPONSE_CODES.OK).json(response);
};

export const getFoodById = async (
  req: Request,
  res: Response
): Promise<void> => {
  /* 
    #swagger.tags = ['Food'] 
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
    res.send(Error.getError("Please provide an id"));
    return;
  }

  await FoodService.getFoodById(id).then((row: Food | undefined) => {
    res.status(RESPONSE_CODES.OK).json(row || {});
  });
};

export const getFoodByTagsAndName = async (
  req: Request,
  res: Response
): Promise<void> => {
  /*
      #swagger.auto = false
      #swagger.tags = ['Food']
      #swagger.parameters['tag'] = {
        in: 'query',
        description: 'Food tag',
        required: false,
        type: 'integer'
      }
      #swagger.parameters['name'] = {
        in: 'query',
        description: 'Food name',
        required: false,
        type: 'string'
      }
      #swagger.description = 'Get Food by single Tag and Name'
      #swagger.responses[200] = {
        description: 'Food successfully obtained',
        schema: { $ref: '#/definitions/FoodResponse' }
      }
      #swagger.responses[404] = {
        description: 'No such item',
        schema: { $ref: '#/definitions/ErrorSearch' }
      }
  */
  const { tag, name } = req.query;
  try {
    const row = await FoodService.getFoodByTagsAndName(
      Number(tag),
      name as string | undefined
    );
    const response: HttpResponse<Food[]> = {
      data: row,
      length: row.length,
    };
    res.status(RESPONSE_CODES.OK).json(response);
  } catch (err) {
    res.status(RESPONSE_CODES.BAD_REQUEST).json(err);
  }
};

export const getFoodByTag = async (
  req: Request,
  res: Response
): Promise<void> => {
  /*
      #swagger.auto = false
      #swagger.tags = ['Food']
      #swagger.description = 'Get Food by Tag'
      #swagger.responses[200] = {
        description: 'Food successfully obtained',
        schema: { $ref: '#/definitions/FoodResponse' }
      }
      #swagger.responses[404] = {
        description: 'No such item',
        schema: { $ref: '#/definitions/ErrorSearch' }
      }
      #swagger.parameters['tag'] = {
        in: 'path',
        description: 'Food tags',
        required: true,
        type: 'number'
      }
    */

  const { tag } = req.params;
  if (!tag) {
    res.send(Error.getError("No entry found"));
    return;
  }

  await FoodService.getFoodByTag(Number(tag)).then((row) => {
    res.status(RESPONSE_CODES.OK).json({
      data: row,
      length: row.length,
    });
  });
};

export const addNewFood = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  /*
    #swagger.tags = ['Food']
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
    tags = [],
    photo,
  } = req.body;

  if (!name || !weight) {
    res
      .status(RESPONSE_CODES.UNPROCESSABLE_ENTITY)
      .json(Error.getError("Both name and weight are required"));
    return;
  }
  try {
    await FoodService.addNewFood({
      name,
      weight,
      caloriesPer100g,
      nutriScore,
      photo,
    });
  } catch (err) {
    next(err);
  }

  try {
    await FoodService.addTags(tags.split(","));
  } catch (err) {
    next(err);
  }

  const response = {
    data: {
      name,
      weight,
      caloriesPer100g,
      nutriScore,
      tags,
      photo,
    },
  };

  res.status(RESPONSE_CODES.OK).json(response);
};

export const deleteFoodById = async (
  req: Request,
  res: Response
): Promise<void> => {
  /* 
  #swagger.tags = ['Food']
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
    res.send(Error.getError("No entry found"));
    return;
  }

  await FoodService.deleteFood(id).catch(() => {
    res.status(RESPONSE_CODES.NOT_FOUND).json(Error.getError("Item not found"));
  });
  res.status(RESPONSE_CODES.OK).json({ message: "Item deleted successfully" });
};

export const editFood = async (req: Request, res: Response): Promise<void> => {
  /*  #swagger.tags = ['Food']
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
    res.send(Error.getError("No entry found"));
    return;
  }

  const { body } = req;

  await FoodService.editFood(id, body)
    .then((row) => {
      res.status(RESPONSE_CODES.CREATED).json(row);
    })
    .catch((err: Error) => {
      res.status(RESPONSE_CODES.NOT_FOUND).json(err);
    });
};
