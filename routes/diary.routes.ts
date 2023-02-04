import express from "express";
import { deleteDiaryItemById, getDiary } from "../controllers/diary.controller";

export const diaryRouter = express.Router();

diaryRouter.get("/", getDiary);

diaryRouter.delete("/:id", deleteDiaryItemById);
