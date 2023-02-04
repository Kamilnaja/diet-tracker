import { Request, Response } from "express";
import { Diary } from "../builders/diary";
import { createDiary } from "../helpers/create-diary";
import { IDiary } from "../models/diary.interface";
import { Error } from "../models/error";
import { IResponse } from "../models/response.interface";

const initialDiary = createDiary();

export const getDiary = (req: Request, res: Response): void => {
  res.json(initialDiary);
};

export const getDiaryById = (req: Request, res: Response): void => {
  const { id } = req.params;

  const foundItem = initialDiary.data.find((item) => item.id === id);

  foundItem
    ? res.status(200).json(foundItem)
    : res.status(204).json(Error.getError("Item not found"));
};

export const addNewDiaryEntry = (req: Request, res: Response) => {
  const {
    date = new Date().toISOString().split("T")[0],
    foodIds,
    id = new Date().getTime().toString(),
  } = req.body;

  if (initialDiary.data.find((item) => item.id === id)) {
    return res
      .status(409)
      .json(Error.getError("Diary entry with this id already exists"));
  }

  const diaryEntry = new Diary().setId(id).setDate(date).setFoodIds(foodIds);

  initialDiary.data.push(diaryEntry.getDiary());
  initialDiary.length++;
};

export const deleteDiaryItemById = (req: Request, res: Response) => {
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

    res.send(response);
  }
};

export const editDiary = (req: Request, res: Response) => {
  const { id } = req.params;

  let foundItemIdx = initialDiary.data.findIndex((item) => item.id === id);

  if (foundItemIdx > -1) {
    res.status(204).send(Error.getError("no id found"));
  }

  const { body } = req;

  const itemToReplace: IDiary = {
    id: id,
    foodsIds: body.foodsIds,
    date: body.date,
  };

  initialDiary.data.splice(foundItemIdx, 1, itemToReplace);

  return res.status(201).send(req.body);
};
