import { use } from "@shared/helpers/utils";
import express from "express";
import { getTagsDict } from "../controllers/dict.controller";

export const dictRouter = express.Router();

dictRouter.get("/tags", use(getTagsDict));
