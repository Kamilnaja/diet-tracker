import { use } from "@shared/helpers/utils";
import express from "express";
import {
  addNewFood,
  deleteFoodById,
  editFood,
  getFoodById,
  getFoods,
  getFoodsByTag,
} from "../controllers/foods.controller";

export const foodsRouter = express.Router();

foodsRouter.get("/", use(getFoods));

foodsRouter.get("/:id", use(getFoodById));

foodsRouter.get("/tags/:tag", use(getFoodsByTag));

foodsRouter.post("/", use(addNewFood));

foodsRouter.delete("/:id", use(deleteFoodById));

foodsRouter.put("/:id", use(editFood));
