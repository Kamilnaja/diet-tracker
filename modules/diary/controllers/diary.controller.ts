import { Request, Response } from "express";
import { IDiary } from "../models/diary.interface";
import { Error } from "../../shared/models/error";
import { IResponse } from "../../shared/models/response.interface";
import { Diary } from "../builders/diary";
import { getInitialDiary } from "../helpers/create-diary";
import { IFood } from "../../foods/models/food.interface";

const initialDiary = getInitialDiary();

export const getDiary = (req: Request, res: Response): void => {
  // #swagger.tags = ['Diary']
  let searchBy = req.query?.data as string;
  searchBy = searchBy?.trim().toLocaleLowerCase();
  let response: IResponse<IDiary[] | undefined>;

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

  const foundItem = initialDiary.data.find((item) => item.id === id);

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

  if (initialDiary.data.find((item) => item.id === id)) {
    return res
      .status(409)
      .json(Error.getError("Diary entry with this id already exists"));
  }

  const diaryEntry = new Diary()
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

  let response: IResponse<IDiary | undefined> = {
    data: undefined,
    length: 0,
  };

  let foundItem = initialDiary.data.find((item) => item.id === id);

  if (foundItem) {
    response = {
      data: foundItem,
      length: 1,
    };

    initialDiary.data = initialDiary.data.filter((item) => item.id !== id);
    initialDiary.length = initialDiary.length - 1;
  }
  res.status(foundItem ? 200 : 404).send(response);
};

export const editDiary = (req: Request, res: Response) => {
  // #swagger.tags = ['Diary']
  const { id } = req.params;

  let foundItemIdx = findItemIdx(id);

  if (foundItemIdx < -1) {
    return res.status(204).send(Error.getError("no id found"));
  }

  const { body } = req;

  const itemToReplace: IDiary = {
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

  let foundItemIdx = findItemIdx(id);
  let foundItem = initialDiary.data.find((item) => item.id === id);

  if (foundItemIdx < -1) {
    return res.status(204).send(Error.getError("no such an item found"));
  }

  const { body } = req;

  foundItem?.foods.push(body);

  initialDiary.data.splice(foundItemIdx, 1, foundItem!);

  return res.status(201).send(req.body);
};

function findItemIdx(id: string) {
  return initialDiary.data.findIndex((item) => item.id === id);
}
