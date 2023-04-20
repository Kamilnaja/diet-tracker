import { Error } from "@models/error";
import { HttpResponse } from "@shared/models/http-response.model";
import { RESPONSE_CODES } from "@shared/models/response-codes.const";
import { Request, Response } from "express";
import { DiaryBuilder } from "../builders/diary.builder";
import { Diary } from "../models/diary.model";
import { FoodInDiary } from "../models/food-in-diary.model";
import { DiaryService } from "../services/diary.service";

export const getDiary = async (req: Request, res: Response) => {
  /* 
    #swagger.auto = false
    #swagger.tags = ['Diary']
    #swagger.description = 'Get all Diary entries'
    #swagger.parameters['date'] = {
      in: 'query',
      description: 'Date of diary entry',
      required: false,
    }
    #swagger.responses[200] = {
      description: 'Diary entries successfully obtained',
      schema: { $ref: '#/definitions/DiaryResponse'}
    }
  */

  let { date } = req.query;

  const mappedRows = date
    ? await DiaryService.getAllDiaryEntriesByDate(date as string)
    : await DiaryService.getAllDiaryEntries();

  let response: HttpResponse<Diary[]> = {
    data: mappedRows,
    length: mappedRows.length,
  };

  return res.status(RESPONSE_CODES.OK).send(response);
};

export const getDiaryById = async (req: Request, res: Response) => {
  /* 
    #swagger.tags = ['Diary'] 
    #swagger.description = 'Get Diary entry by ID'
    #swagger.responses[200] = {
      description: 'Diary entry successfully obtained',
      schema: { $ref: '#/definitions/DiaryEntry' }
    }
    #swagger.responses[404] = {
      description: 'No such item',
      schema: { $ref: '#/definitions/ErrorSearch' }
    }
  */

  const { id } = req.params;

  const foundItem = await DiaryService.getDiaryEntryById(id as string);

  foundItem
    ? res.status(RESPONSE_CODES.OK).json(foundItem)
    : res
        .status(RESPONSE_CODES.NOT_FOUND)
        .json(Error.getError("Item not found"));
};

export const addNewDiaryEntry = async (req: Request, res: Response) => {
  /* 
    #swagger.tags = ['Diary'] 
    #swagger.description = 'Add new Diary entry'
    #swagger.parameters['body'] = {
      in: 'body',
      description: 'Diary entry',
      required: true,
      type: 'object',
      schema: { $ref: '#/definitions/DiaryEntry' }
    }
    #swagger.responses[200] = {
      description: 'Diary entry successfully added',
      schema: { $ref: '#/definitions/DiaryEntry' }
    }
    #swagger.responses[409] = {
      description: 'Diary entry with this id already exists',
      schema: { $ref: '#/definitions/ErrorConflict' }
    }
  */

  const { date = new Date().toISOString().split("T")[0], foods } = req.body;

  await DiaryService.addDiaryItem();
  await DiaryService.addFoodToDiary(foods);

  const diaryEntry = new DiaryBuilder().setDate(date).setFoods(foods).build();

  res.send(diaryEntry);
};

export const deleteDiaryItemById = async (req: Request, res: Response) => {
  /* 
    #swagger.tags = ['Diary']
    #swagger.description = 'Delete Diary entry by ID'
    #swagger.responses[200] = {
      description: 'Diary entry successfully deleted',
      schema: { $ref: '#/definitions/DeleteSuccess' }
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

  await DiaryService.deleteDiaryItemById(id);

  res.status(RESPONSE_CODES.OK).send({ message: "Item deleted" });
};

export const addFoodsToDiary = async (req: Request, res: Response) => {
  /* 
    #swagger.tags = ['Diary']
    #swagger.description = 'Add new Meal to Diary'
    #swagger.parameters['body'] = {
                in: 'body',
                description: 'Food Body',
                schema: [{ $ref: '#/definitions/FoodInDiary' }]
        }
    #swagger.responses[201] = {
      description: 'Food successfully added',
      schema: { $ref: '#/definitions/DiaryEntry' }
    }
    #swagger.responses[404] = {
      description: 'No such item',
      schema: { $ref: '#/definitions/ErrorSearch' }
    }
  */
  const { id } = req.params;

  if (!id) {
    return res.send(Error.getError("No id"));
  }

  const { body } = req;

  await DiaryService.addFoodsToExistingDiary(id, body as FoodInDiary[]);

  return res.status(RESPONSE_CODES.CREATED).send(req.body);
};

export const deleteFoodDiaryItemById = async (req: Request, res: Response) => {
  /* 
    #swagger.tags = ['Diary']
    #swagger.description = 'Delete Food Diary entry by ID'
    #swagger.responses[200] = {
      description: 'Diary entry successfully deleted',
      schema: { $ref: '#/definitions/DiaryEntry' }
  }
    #swagger.responses[404] = {
      description: 'No such item',
      schema: { $ref: '#/definitions/ErrorSearch' }
  }
   */
  const { id, foodId } = req.params;

  if (!id || !foodId) {
    return res.send(Error.getError("Both ids are required"));
  }

  let response: HttpResponse<Diary | undefined> = {
    data: undefined,
    length: 0,
  };

  await DiaryService.deleteFoodFromDiary(id, foodId);

  res.status(RESPONSE_CODES.OK).send(response);
};
