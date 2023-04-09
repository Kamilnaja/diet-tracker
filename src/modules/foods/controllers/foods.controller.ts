import { Error } from "@models/error";
import { HttpResponse } from "@shared/models/http-response.model";
import { RESPONSE_CODES } from "@shared/models/response-codes.const";
import { NextFunction, Request, Response } from "express";
import { db } from "../../../db";
import { Food } from "../models/food.model";

export const getFoods = (req: Request, res: Response, next: NextFunction) => {
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
  let name = req.query.name;
  if (name) {
    db.all(
      `SELECT f.*, GROUP_CONCAT(t.id) AS tags
      FROM foods f
      LEFT JOIN food_tags ft ON f.id = ft.food_id
      LEFT JOIN tags t ON ft.tag_id = t.id
      WHERE f.name LIKE ?
      GROUP BY f.id`,
      [name],
      (err: any, rows: any) => {
        if (err) {
          res.status(RESPONSE_CODES.NOT_FOUND).json(err.message);
        }
        let response: HttpResponse<Food> = {
          data: rows,
          length: rows.length,
        };
        res.status(RESPONSE_CODES.OK).json(response);
      }
    );
  } else {
    db.all(
      `SELECT f.*, GROUP_CONCAT(t.id) AS tags
      FROM foods f
      LEFT JOIN food_tags ft ON f.id = ft.food_id
      LEFT JOIN tags t ON ft.tag_id = t.id
      GROUP BY f.id`,
      (err: any, rows: any) => {
        if (err) {
          next(err);
        }
        let response: HttpResponse<Food> = {
          data: rows,
          length: rows.length,
        };
        res.status(RESPONSE_CODES.OK).json(response);
      }
    );
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

  // get from db
  db.get(
    `
    SELECT f.*, GROUP_CONCAT(t.id) AS tags
    FROM foods f 
    LEFT JOIN food_tags ft ON f.id = ft.food_id
    LEFT JOIN tags t ON ft.tag_id = t.id
    WHERE f.id = ? 
    GROUP BY f.id`,
    [id],
    (err: any, row: any) => {
      if (err) {
        return console.error(err.message);
      }

      res.status(RESPONSE_CODES.OK).json(row);
    }
  );
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
  let id: string;

  const { name, weight, caloriesPer100g, nutriScore, tags = [] } = req.body;

  if (!name || !weight) {
    return res
      .status(RESPONSE_CODES.UNPROCESSABLE_ENTITY)
      .json(Error.getError("Both name and weight are required"));
  }

  db.run(
    `INSERT INTO foods (name, weight, calories_per_100g, nutri_score) VALUES (?, ?, ?, ?)`,
    [name, weight, caloriesPer100g, nutriScore],
    function (err: any) {
      if (err) {
        res.status(RESPONSE_CODES.UNPROCESSABLE_ENTITY).json(err.message);
      }
    }
  );

  if (tags.length) {
    db.get(
      `SELECT id FROM foods ORDER BY ID DESC LIMIT 1`,
      (err: any, row: any) => {
        if (err) {
          return console.error(err.message);
        }
        id = row.id;

        tags.forEach((tagId: string) => {
          db.run(
            `INSERT INTO food_tags (food_id, tag_id) VALUES (?, ?)`,
            [id, tagId],
            function (err: any) {
              if (err) {
                res
                  .status(RESPONSE_CODES.UNPROCESSABLE_ENTITY)
                  .json(err.message);
              }
            }
          );
        });
      }
    );
  }

  res
    .status(RESPONSE_CODES.CREATED)
    .json({ name, weight, caloriesPer100g, nutriScore, tags });
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

  // delete from db
  db.run(`DELETE FROM foods WHERE id = ?`, [id], function (err: any) {
    if (err) {
      res.status(RESPONSE_CODES.UNPROCESSABLE_ENTITY).json(err.message);
    }
    res.status(RESPONSE_CODES.OK).json({ id, message: "Item deleted" });
  });
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

  const { body } = req;

  // edit food
  db.run(
    `UPDATE foods SET name = ?, weight = ?, calories_per_100g = ?, nutri_score = ? WHERE id = ?`,
    [body.name, body.weight, body.caloriesPer100g, body.nutriScore, id],
    function (err: any) {
      if (err) {
        res.status(RESPONSE_CODES.UNPROCESSABLE_ENTITY).json(err.message);
      }
      console.log(`A row has been updated with rowid ${id}`);
    }
  );
  return res.status(RESPONSE_CODES.CREATED).send(req.body);
};
