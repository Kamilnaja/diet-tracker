import express from "express";
import {
  deleteUserById,
  getUsers,
  registerUser,
} from "../controllers/auth.controller";

export const authRouter = express.Router();

authRouter.get("/", getUsers);
authRouter.post("/", registerUser);
authRouter.delete("/:id", deleteUserById);
