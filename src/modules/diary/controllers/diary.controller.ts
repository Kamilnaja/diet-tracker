import { Error } from "@models/error";
import { ControllerReq } from "@shared/models/controler-req.model";
import { HttpResponse } from "@shared/models/http-response.model";
import { RESPONSE_CODES } from "@shared/models/response-codes.const";
import { Request, Response } from "express";
import { DiaryBuilder } from "../builders/diary.builder";
import { Diary } from "../models/diary.model";
import { FoodInDiary } from "../models/food-in-diary.model";
import { DiaryService } from "../services/diary.service";
import dateFormatValidator from "../validators/date-format.validator";

const diaryService = new DiaryService();

export const getDiary: ControllerReq = async (req: Request, res: Response) => {
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

  const { date } = req.query;

  if (date && !dateFormatValidator(date as string).isValid) {
    res.status(RESPONSE_CODES.BAD_REQUEST).send(Error.getError("Invalid date"));
    return;
  }

  const mappedRows = date
    ? await diaryService.getDiaryEntriesByDate(date as string)
    : await diaryService.getAllDiaryEntries();

  const response: HttpResponse<Diary[]> = {
    data: mappedRows,
    length: mappedRows.length,
  };

  res.status(RESPONSE_CODES.OK).send(response);
};

export const getDiaryById: ControllerReq = async (
  req: Request,
  res: Response
) => {
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

  const foundItem = await diaryService.getDiaryEntryById(id as string);

  foundItem
    ? res.status(RESPONSE_CODES.OK).json(foundItem)
    : res
        .status(RESPONSE_CODES.NOT_FOUND)
        .json(Error.getError("Item not found"));
};

export const editDiaryEntry: ControllerReq = async (
  req: Request,
  res: Response
) => {
  /* 
      #swagger.tags = ['Diary'] 
      #swagger.description = 'Edit Diary entry, that contains date & food, should be used when editing item in diary'
      #swagger.responses[200] = {
      description: 'Diary entry successfully edited',
      schema: { $ref: '#/definitions/DiaryPayload' }
    }
      #swagger.parameters['body'] = {
        in: 'body',
        description: 'Diary entry',
        required: true,
        type: 'object',
        schema: { $ref: '#/definitions/FoodInDiary' }
    }
    */
  const { uniqueFoodId } = req.params;

  if (!uniqueFoodId) {
    res.send(Error.getError("Both ids are required"));
    return;
  }

  if (!req.body) {
    res.send(Error.getError("No body"));
    return;
  }

  const { body } = req;
  await diaryService.editDiaryEntry(uniqueFoodId, body);
  res.status(RESPONSE_CODES.OK).send({ message: "Item updated" });
};

export const addNewDiaryEntry: ControllerReq = async (
  req: Request,
  res: Response
) => {
  /* 
    #swagger.tags = ['Diary'] 
    #swagger.description = 'Add new Diary entry, that contains date & food, should be used when adding new food to diary'
    #swagger.parameters['body'] = {
      in: 'body',
      description: 'Diary entry',
      required: true,
      type: 'object',
      schema: { $ref: '#/definitions/DiaryPayload' }
    }
    #swagger.responses[200] = {
      description: 'Diary entry successfully added',
      schema: { $ref: '#/definitions/DiaryAddResponse' }
    }
    #swagger.responses[409] = {
      description: 'Diary entry with this id already exists',
      schema: { $ref: '#/definitions/ErrorConflict' }
    }
  */

  const { date = new Date().toISOString().split("T")[0], food } = req.body;

  if (!dateFormatValidator(date).isValid) {
    res.status(RESPONSE_CODES.BAD_REQUEST).send(Error.getError("Invalid date"));
    return;
  }

  const currentDayDiaryId = await diaryService.getDiaryEntryIdForDay(date);

  currentDayDiaryId != null
    ? await diaryService.addFoodToDiary(currentDayDiaryId, food)
    : await createNewDiaryItemAndAddFood(date, food);

  const diaryEntry = new DiaryBuilder().setDate(date).setFood(food).build();

  res.send(diaryEntry);
};

export const deleteDiaryItemById: ControllerReq = async (
  req: Request,
  res: Response
) => {
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
    res.send(Error.getError("No entry found"));
    return;
  }

  await diaryService.deleteDiaryItemById(id);

  res.status(RESPONSE_CODES.OK).send({ message: "Item deleted" });
};

export const addFoodToDiary: ControllerReq = async (
  req: Request,
  res: Response
) => {
  /* 
    #swagger.ignore = true
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
    res.send(Error.getError("No id"));
    return;
  }

  const { body } = req;

  await diaryService.addFoodToExistingDiary(id, body as FoodInDiary);

  res.status(RESPONSE_CODES.CREATED).send(req.body);
};

export const deleteFoodDiaryItemById: ControllerReq = async (
  req: Request,
  res: Response
) => {
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
    res.send(Error.getError("Both ids are required"));
    return;
  }

  const response: HttpResponse<Diary | undefined> = {
    data: undefined,
    length: 0,
  };

  await diaryService.deleteFoodFromDiary(id, foodId);

  res.status(RESPONSE_CODES.OK).send(response);
};

const createNewDiaryItemAndAddFood = async (
  date: string,
  food: FoodInDiary
): Promise<void> => {
  await diaryService.addDiaryItem(date);
  const currentId = await diaryService.getLastDiaryItemId();
  await diaryService.addFoodToDiary(currentId, food);
};
