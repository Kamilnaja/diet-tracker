import express from "express";
import { getDiary } from "../controllers/diary.controller";

export const diaryRouter = express.Router();

diaryRouter.get("/", getDiary);
