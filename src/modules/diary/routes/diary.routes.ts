import express from "express";
import {
  addFoodsToDiary,
  addNewDiaryEntry,
  deleteDiaryItemById,
  deleteFoodDiaryItemById,
  editDiary,
  getDiary,
  getDiaryById,
} from "../controllers/diary.controller";

export const diaryRouter = express.Router();

diaryRouter.get("/", getDiary);

diaryRouter.get("/:id", getDiaryById);

diaryRouter.post("/", addNewDiaryEntry);

diaryRouter.delete("/:id", deleteDiaryItemById);

diaryRouter.put("/:id", editDiary);

diaryRouter.post("/:id/foods", addFoodsToDiary);

diaryRouter.delete("/:id/foods/:foodId", deleteFoodDiaryItemById);
