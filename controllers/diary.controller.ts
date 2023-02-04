import { Request, Response } from "express";
import { createDiary } from "../helpers/create-diary";
import { IDiary } from "../models/diary.interface";
import { IResponse } from "../models/response.interface";

const initialDiary = createDiary();

export const getDiary = (req: Request, res: Response) => {
  res.json(initialDiary);
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
