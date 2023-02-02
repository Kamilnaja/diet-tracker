import { Request, Response } from "express";
import { createDiary } from "../helpers/create-diary";

const diary = createDiary();

export const getDiary = (req: Request, res: Response) => {
  res.json(diary);
};
