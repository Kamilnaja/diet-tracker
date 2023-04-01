import { Error } from "@models/error";
import { HttpResponse } from "@shared/models/http-response.model";
import { RESPONSE_CODES } from "@shared/models/response-codes.const";
import { Request, Response } from "express";
import { DiaryBuilder } from "../builders/diary.builder";
import { getInitialDiary } from "../helpers/create-diary";
import { Diary } from "../models/diary.model";

const initialDiary = getInitialDiary();

export const getDiary = (req: Request, res: Response): void => {
  /* 
    #swagger.tags = ['Diary']
    #swagger.description = 'Get all Diary entries'
    #swagger.responses[200] = {
      description: 'Diary entries successfully obtained',
      schema: { $ref: '#/definitions/DiaryResponse'}
    }
  */

  let searchBy = req.query?.data as string;
  searchBy = searchBy?.trim().toLocaleLowerCase();

  if (searchBy) {
    initialDiary.filter("date", searchBy);
  }

  res.json(initialDiary.getResponse);
};

export const getDiaryById = (req: Request, res: Response) => {
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

  if (!id) {
    return res.send(Error.getError("Item not found"));
  }

  const foundItem = initialDiary.find("id", id);

  foundItem
    ? res.status(RESPONSE_CODES.OK).json(foundItem)
    : res
        .status(RESPONSE_CODES.NOT_FOUND)
        .json(Error.getError("Item not found"));
};

export const addNewDiaryEntry = (req: Request, res: Response) => {
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

  const {
    date = new Date().toISOString().split("T")[0],
    foods,
    id = new Date().getTime().toString(),
  } = req.body;

  if (initialDiary.find("id", id)) {
    return res
      .status(RESPONSE_CODES.CONFLICT)
      .json(Error.getError("Diary entry with this id already exists"));
  }

  const diaryEntry = new DiaryBuilder()
    .setId(id)
    .setDate(date)
    .setFoods(foods)
    .build();

  initialDiary.add(diaryEntry);

  res.send(diaryEntry);
};

export const deleteDiaryItemById = (req: Request, res: Response) => {
  /* 
    #swagger.tags = ['Diary']
    #swagger.description = 'Delete Diary entry by ID'
    #swagger.responses[200] = {
      description: 'Diary entry successfully deleted',
      schema: { $ref: '#/definitions/DiaryEntry' }
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

  let response: HttpResponse<Diary | undefined> = {
    data: undefined,
    length: 0,
  };

  let foundItem = initialDiary.find("id", id);

  if (foundItem) {
    response = {
      data: foundItem,
      length: 1,
    };

    initialDiary.filter("id", id);
  }
  res
    .status(foundItem ? RESPONSE_CODES.OK : RESPONSE_CODES.NOT_FOUND)
    .send(response);
};

export const editDiary = (req: Request, res: Response) => {
  /* 
    #swagger.tags = ['Diary'] 
    #swagger.description = 'Edit Diary entry'
    #swagger.parameters['body'] = {
      in: 'body',
      description: 'Diary entry',
      required: true,
      type: 'object',
      schema: { $ref: '#/definitions/DiaryEntry' }
    }
    #swagger.responses[200] = {
      description: 'Diary entry successfully edited',
      schema: { $ref: '#/definitions/DiaryEntry' }
    }
    #swagger.responses[404] = {
      description: 'No such item',
      schema: { $ref: '#/definitions/ErrorSearch' }
    }
  */

  const { id } = req.params;

  if (!id) {
    return res
      .status(RESPONSE_CODES.NOT_FOUND)
      .send(Error.getError("ID not found"));
  }

  const foundItemId = initialDiary.find("id", id)?.id;

  if (!foundItemId) {
    return res
      .status(RESPONSE_CODES.NOT_FOUND)
      .send(Error.getError("no id found"));
  }

  const { body } = req;

  const itemToReplace: Diary = {
    id: id,
    foods: body.foods,
    date: body.date,
  };

  initialDiary.replace(foundItemId, itemToReplace);

  return res.status(RESPONSE_CODES.CREATED).send(req.body);
};

export const addFoodsToDiary = (req: Request, res: Response) => {
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

  let foundItemIdx = initialDiary.findIdx("id", id);
  let foundItem = initialDiary.find("id", id);

  if (foundItemIdx < -1) {
    return res
      .status(RESPONSE_CODES.NOT_FOUND)
      .send(Error.getError("No such item"));
  }

  const { body } = req;

  foundItem?.foods.push(body);

  initialDiary.replace(foundItem!.id, foundItem!);

  return res.status(RESPONSE_CODES.CREATED).send(req.body);
};
