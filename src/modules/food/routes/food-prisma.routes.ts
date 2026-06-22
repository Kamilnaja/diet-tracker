import express from "express";
import {
  getPrismaFood,
  getPrismaFoodById,
} from "../controllers/food-prisma.controller";
export const foodPrismaRouter = express.Router();

foodPrismaRouter.get("/", getPrismaFood);
foodPrismaRouter.get("/:id", getPrismaFoodById);
