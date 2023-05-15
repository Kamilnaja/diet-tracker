import { Error } from "@models/error";
import { HttpResponse } from "@shared/models/http-response.model";
import { RESPONSE_CODES } from "@shared/models/response-codes.const";
import { NextFunction, Request, Response } from "express";
import { Food } from "../models/food.model";
import { FoodsService } from "../services/foods.service";

export const getFoods = async (req: Request, res: Response): Promise<void> => {
  /*
    #swagger.auto = false
    #swagger.tags = ['Foods']
    #swagger.description = 'Get all Foods'
    #swagger.parameters['name'] = {
      in: 'query',
      description: 'Food name',
      required: false,
      type: 'string'
    }
    #swagger.responses[200] = {
      description: 'Foods successfully obtained',
      schema: { $ref: '#/definitions/FoodResponse'}
    }
  */

  const { name } = req.query;
  const rows = name
    ? await FoodsService.getAllFoodsByName(name as string)
    : await FoodsService.getAllFoods();

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
    res.send(Error.getError("No entry found"));
    return;
  }

  await FoodsService.getFoodById(id).then((row: Food | undefined) => {
    res.status(RESPONSE_CODES.OK).json(row || {});
  });
};

export const getFoodsByTagsAndName = async (
  req: Request,
  res: Response
): Promise<void> => {
  /*
      #swagger.auto = false
      #swagger.tags = ['Foods']
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
      #swagger.description = 'Get Food by Tag and Name'
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
    const row = await FoodsService.getFoodsByTagsAndName(
      Number(tag),
      String(name)
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

export const getFoodsByTag = async (
  req: Request,
  res: Response
): Promise<void> => {
  /*
      #swagger.auto = false
      #swagger.tags = ['Foods']
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

  await FoodsService.getFoodByTag(Number(tag)).then((row) => {
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
    await FoodsService.addNewFood({
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
    await FoodsService.addTags(tags.split(","));
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
    },
  };

  res.status(RESPONSE_CODES.OK).json(response);
};

export const deleteFoodById = async (
  req: Request,
  res: Response
): Promise<void> => {
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
    res.send(Error.getError("No entry found"));
    return;
  }

  await FoodsService.deleteFood(id).catch(() => {
    res.status(RESPONSE_CODES.NOT_FOUND).json(Error.getError("Item not found"));
  });
  res.status(RESPONSE_CODES.OK).json({ message: "Item deleted successfully" });
};

export const editFood = async (req: Request, res: Response): Promise<void> => {
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
    res.send(Error.getError("No entry found"));
    return;
  }

  const { body } = req;

  await FoodsService.editFood(id, body)
    .then((row) => {
      res.status(RESPONSE_CODES.CREATED).json(row);
    })
    .catch((err: Error) => {
      res.status(RESPONSE_CODES.NOT_FOUND).json(err);
    });
};
