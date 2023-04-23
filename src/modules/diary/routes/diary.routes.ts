import { use } from "@shared/helpers/utils";
import express from "express";
import {
  addFoodsToDiary,
  addNewDiaryEntry,
  deleteDiaryItemById,
  deleteFoodDiaryItemById,
  getDiary,
  getDiaryById,
} from "../controllers/diary.controller";

export const diaryRouter = express.Router();

diaryRouter.get("/", use(getDiary));

diaryRouter.get("/:id", use(getDiaryById));

diaryRouter.post("/", use(addNewDiaryEntry));

diaryRouter.delete("/:id", use(deleteDiaryItemById));

diaryRouter.post("/:id/foods", use(addFoodsToDiary));

diaryRouter.delete("/:id/foods/:foodId", use(deleteFoodDiaryItemById));
