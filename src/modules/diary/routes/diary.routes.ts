import express from "express";
import {
  addFoodToDiary,
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

diaryRouter.put("/food/:uniqueFoodId", editDiaryEntry);

diaryRouter.post("/", addNewDiaryEntry);

diaryRouter.delete("/:id", deleteDiaryItemById);

diaryRouter.post("/:id/food", addFoodToDiary);

diaryRouter.delete("/:id/food/:foodId", deleteFoodDiaryItemById);
