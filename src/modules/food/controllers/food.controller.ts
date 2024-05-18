import { Error } from "@models/error";
import { convertStringToNumber } from "@shared/helpers/convert-string-to-number";
import { ControllerReq } from "@shared/models/controler-req.model";
import { HttpResponse } from "@shared/models/http-response.model";
import { RESPONSE_CODES } from "@shared/models/response-codes.const";
import { NextFunction, Request, Response } from "express";
import { Food } from "../models/food.model";
import { FoodService } from "../services/food.service";
import { mapFoodDbToFood } from "./food.util";

const foodService = new FoodService();

export const getFood: ControllerReq = async (req: Request, res: Response) => {
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
    #swagger.parameters['page'] = {
      in: 'query',
      description: 'Page number',
      required: false,
      type: 'number'
    }
    #swagger.parameters['limit'] = {
      in: 'query',
      description: 'Number of items per page',
      required: false,
      type: 'number'
    }
    #swagger.responses[200] = {
      description: 'Food successfully obtained',
      schema: { $ref: '#/definitions/FoodResponse'}
    }
  */

  const { name, page, limit } = req.query;

  try {
    const rows = name
      ? await foodService.getAllFoodByName(
          name as string,
          convertStringToNumber(limit as string),
          convertStringToNumber(page as string)
        )
      : await foodService.getAllFood(
          convertStringToNumber(limit as string),
          convertStringToNumber(page as string)
        );

    const response: HttpResponse<Food[]> = {
      data: rows.map(mapFoodDbToFood),
      length: rows.length,
    };
    res.status(RESPONSE_CODES.OK).json(response);
  } catch (err) {
    res.status(RESPONSE_CODES.BAD_REQUEST).json(Error.getError("Bad request"));
  }
};

export const getFoodById: ControllerReq = async (
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

  const rows = await foodService.getFoodById(id);

  if (!rows) {
    res.status(RESPONSE_CODES.NOT_FOUND).json(Error.getError("No such item"));
    return;
  }

  res.status(RESPONSE_CODES.OK).json({
    ...rows,
    tags: rows.tags ? rows.tags.split(",") : [],
  });
};

export const getFoodByTagsAndName: ControllerReq = async (
  req: Request,
  res: Response
) => {
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
      #swagger.parameters['page'] = {
        in: 'query',
        description: 'Page number',
        required: false,
        type: 'number'
      }
      #swagger.parameters['limit'] = {
        in: 'query',
        description: 'Number of items per page',
        required: false,
        type: 'number'
      }
      #swagger.parameters['page'] = {
        in: 'query',
        description: 'Page number',
        required: false,
        type: 'number'
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
  const { tag, name, limit, page } = req.query;
  try {
    const row = await foodService.getFoodByTagsAndName(
      Number(tag),
      name as string,
      convertStringToNumber(limit as string),
      convertStringToNumber(page as string)
    );
    const response: HttpResponse<Food[]> = {
      data: row.map(mapFoodDbToFood),
      length: row.length,
    };
    res.status(RESPONSE_CODES.OK).json(response);
  } catch (err) {
    res.status(RESPONSE_CODES.BAD_REQUEST).json(err);
  }
};

/**
 *
 * @param req
 * @param res
 * @returns Food[]
 */
export const getFoodByTag: ControllerReq = async (
  req: Request,
  res: Response
) => {
  /*
      #swagger.auto = false
      #swagger.tags = ['Food']
      #swagger.description = 'Get Food by Tag'
       #swagger.parameters['tag'] = {
        in: 'path',
        description: 'Food tags',
        required: true,
        type: 'number'
      }
      #swagger.parameters['page'] = {
      in: 'query',
      description: 'Page number',
      required: false,
      type: 'number'
    }
    #swagger.parameters['limit'] = {
      in: 'query',
      description: 'Number of items per page',
      required: false,
      type: 'number'
    }
    #swagger.responses[200] = {
      description: 'Food successfully obtained',
      schema: { $ref: '#/definitions/FoodResponse' }
    }
     #swagger.responses[404] = {
      description: 'No such item',
      schema: { $ref: '#/definitions/ErrorSearch' }
    } 
    */

  const { tag, limit } = req.params;
  if (!tag) {
    res.send(Error.getError("No entry found"));
    return;
  }

  await foodService.getFoodByTag(Number(tag), Number(limit)).then((row) => {
    res.status(RESPONSE_CODES.OK).json({
      data: row.map(mapFoodDbToFood),
      length: row.length,
    });
  });
};

export const addNewFood: ControllerReq = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
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
    await foodService.addNewFood({
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
    await foodService.addTags(tags.split(","));
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

export const deleteFoodById: ControllerReq = async (
  req: Request,
  res: Response
) => {
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

  await foodService.deleteFood(id).catch(() => {
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

  await foodService
    .editFood(id, body)
    .then((row) => {
      res.status(RESPONSE_CODES.CREATED).json(row);
    })
    .catch((err: Error) => {
      res.status(RESPONSE_CODES.NOT_FOUND).json(err);
    });
};
