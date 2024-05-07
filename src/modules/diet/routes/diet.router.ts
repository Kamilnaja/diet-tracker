import express from "express";
import { getDietBydId, getDiets } from "../controllers/diet.controller";

export const dietRouter = express.Router();

dietRouter.get("/", getDiets);
dietRouter.get("/:id", getDietBydId);
