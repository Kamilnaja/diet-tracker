import express from "express";
import { getSettings } from "../controllers/settings.controller";

export const settingsRouter = express.Router();

settingsRouter.get("/", getSettings);
