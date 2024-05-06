import express from "express";
import { getDiets } from "../controllers/diet.controller";

export const dietRouter = express.Router();

dietRouter.get("/", getDiets);
