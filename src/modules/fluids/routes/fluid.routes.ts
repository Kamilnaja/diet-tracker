import express from "express";
import {
  addNewFluid,
  deleteFluidById,
  editFluid,
  getFluidById,
  getFluids,
} from "../controllers/fluids.controller";

export const fluidsRouter = express.Router();

fluidsRouter.get("/", getFluids);

fluidsRouter.get("/:id", getFluidById);

fluidsRouter.post("/", addNewFluid);

fluidsRouter.delete("/:id", deleteFluidById);

fluidsRouter.put("/:id", editFluid);
