import express from "express";
import {
  addFoodsToDiary,
  addNewDiaryEntry,
  deleteDiaryItemById,
  deleteFoodDiaryItemById,
  editDiaryEntry,
  getDiary,
  getDiaryById,
} from "../controllers/diary.controller";

export const diaryRouter = express.Router();

diaryRouter.get("/", getDiary);

diaryRouter.get("/:id", getDiaryById);

diaryRouter.put("/foods/:uniqueFoodId", editDiaryEntry);

diaryRouter.post("/", addNewDiaryEntry);

diaryRouter.delete("/:id", deleteDiaryItemById);

diaryRouter.post("/:id/foods", addFoodsToDiary);

diaryRouter.delete("/:id/foods/:foodId", deleteFoodDiaryItemById);
