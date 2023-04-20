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

foodsRouter.get("/", getFoods);

foodsRouter.get("/:id", getFoodById);

foodsRouter.get("/tags/:tag", getFoodsByTag);

foodsRouter.post("/", addNewFood);

foodsRouter.delete("/:id", deleteFoodById);

foodsRouter.put("/:id", editFood);
