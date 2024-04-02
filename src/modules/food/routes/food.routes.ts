import express from "express";
import {
  addNewFood,
  deleteFoodById,
  editFood,
  getFood,
  getFoodById,
  getFoodByTag,
  getFoodByTagsAndName,
} from "../controllers/food.controller";

export const foodRouter = express.Router();

foodRouter.get("/", getFood);

foodRouter.get("/search", getFoodByTagsAndName);

foodRouter.get("/:id", getFoodById);

foodRouter.get("/tags/:tag", getFoodByTag);

foodRouter.post("/", addNewFood);

foodRouter.delete("/:id", deleteFoodById);

foodRouter.put("/:id", editFood);
