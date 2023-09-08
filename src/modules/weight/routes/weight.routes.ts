import express from "express";
import {
  addWeight,
  deleteWeight,
  editWeight,
  getWeights,
} from "../controllers/weight.controller";

export const weightRouter = express.Router();

weightRouter.get("/", getWeights);
weightRouter.post("/", addWeight);
weightRouter.put("/:id", editWeight);
weightRouter.delete("/:id", deleteWeight);
