import { use } from "@shared/helpers/utils";
import express from "express";
import {
  addNewFluid,
  deleteFluidById,
  editFluid,
  getFluidById,
  getFluids,
} from "../controllers/fluids.controller";

export const fluidsRouter = express.Router();

fluidsRouter.get("/", use(getFluids));

fluidsRouter.get("/:id", use(getFluidById));

fluidsRouter.post("/", use(addNewFluid));

fluidsRouter.delete("/:id", use(deleteFluidById));

fluidsRouter.put("/:id", use(editFluid));
