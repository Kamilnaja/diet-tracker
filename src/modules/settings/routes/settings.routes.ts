import express from "express";
import { editSettings, getSettings } from "../controllers/settings.controller";

export const settingsRouter = express.Router();

settingsRouter.get("/", getSettings);

settingsRouter.put("/", editSettings);
