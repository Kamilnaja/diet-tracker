import { Error } from "@models/error";
import { HttpResponse } from "@models/http-response.interface";
import {
  filterItemById,
  findItemById,
  findItemIdxById,
} from "@shared/helpers/array-helpers";
import { Request, Response } from "express";
import { DiaryBuilder } from "../builders/diary-builder";
import { getInitialDiary } from "../helpers/create-diary";
import { Diary, DiaryAllReponse } from "../models/diary.interface";

const initialDiary = getInitialDiary();

export const getDiary = (req: Request, res: Response): void => {
  // #swagger.tags = ['Diary']
  let searchBy = req.query?.data as string;
  searchBy = searchBy?.trim().toLocaleLowerCase();
  let response: DiaryAllReponse;

  if (searchBy) {
    const results = initialDiary.data.filter((item) => item.date === searchBy);

    response = {
      data: results,
      length: 1,
    };
  } else {
    response = {
      ...initialDiary,
      data: initialDiary.data,
    };
  }

  res.json(response);
};

export const getDiaryById = (req: Request, res: Response): void => {
  // #swagger.tags = ['Diary']
  const { id } = req.params;

  const foundItem = findItemById(id, initialDiary);

  foundItem
    ? res.status(200).json(foundItem)
    : res.status(204).json(Error.getError("Item not found"));
};

export const addNewDiaryEntry = (req: Request, res: Response) => {
  // #swagger.tags = ['Diary']
  const {
    date = new Date().toISOString().split("T")[0],
    foods,
    id = new Date().getTime().toString(),
  } = req.body;

  if (findItemById(id, initialDiary)) {
    return res
      .status(409)
      .json(Error.getError("Diary entry with this id already exists"));
  }

  const diaryEntry = new DiaryBuilder()
    .setId(id)
    .setDate(date)
    .setFoods(foods)
    .getDiary();

  initialDiary.data.push(diaryEntry);
  initialDiary.length++;

  res.send(diaryEntry);
};

export const deleteDiaryItemById = (req: Request, res: Response) => {
  // #swagger.tags = ['Diary']
  const id = req.params.id;

  let response: HttpResponse<Diary | undefined> = {
    data: undefined,
    length: 0,
  };

  let foundItem = findItemById(id, initialDiary);

  if (foundItem) {
    response = {
      data: foundItem,
      length: 1,
    };

    initialDiary.data = filterItemById(id, initialDiary);
    initialDiary.length = initialDiary.length - 1;
  }
  res.status(foundItem ? 200 : 404).send(response);
};

export const editDiary = (req: Request, res: Response) => {
  // #swagger.tags = ['Diary']
  const { id } = req.params;

  let foundItemIdx = findItemIdxById(id, initialDiary);

  if (foundItemIdx < -1) {
    return res.status(204).send(Error.getError("no id found"));
  }

  const { body } = req;

  const itemToReplace: Diary = {
    id: id,
    foods: body.foods,
    date: body.date,
  };

  initialDiary.data.splice(foundItemIdx, 1, itemToReplace);

  return res.status(201).send(req.body);
};

export const addFoodsToDiary = (req: Request, res: Response) => {
  // #swagger.tags = ['Diary']
  // #swagger.description = 'Add new Food to Diary'
  /*  #swagger.parameters['body'] = {
                in: 'body',
                description: 'Food Body',
                schema: [{
                  $weight: 100,
                  $id: "3",
                }]
        } */

  const { id } = req.params;

  let foundItemIdx = findItemIdxById(id, initialDiary);
  let foundItem = findItemById(id, initialDiary);

  if (foundItemIdx < -1) {
    return res.status(204).send(Error.getError("no such an item found"));
  }

  const { body } = req;

  foundItem?.foods.push(body);

  initialDiary.data.splice(foundItemIdx, 1, foundItem!);

  return res.status(201).send(req.body);
};
