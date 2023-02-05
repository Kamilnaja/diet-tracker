import express from "express";
import {
  addNewDiaryEntry,
  deleteDiaryItemById,
  editDiary,
  getDiary,
  getDiaryById,
} from "../controllers/diary.controller";

export const diaryRouter = express.Router();

diaryRouter.get("/", getDiary);

diaryRouter.get("/:id", getDiaryById);

diaryRouter.post("/:id", addNewDiaryEntry);

diaryRouter.delete("/:id", deleteDiaryItemById);

diaryRouter.put("/:id", editDiary);