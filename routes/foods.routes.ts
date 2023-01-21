import express from "express";
import {
  addNewFood,
  deleteFoodById,
  editFood,
  getFoodById,
  getFoods,
} from "../controllers/foods.controller";

export const router = express.Router();

router.get("/", (req, res) => {
  res.send("Express + TypeScript Server");
});

router.get("/foods", getFoods);

router.get("/foods/:id", getFoodById);

router.post("/foods", addNewFood);

router.delete("/foods/:id", deleteFoodById);

router.put("/foods/:id", editFood);
