import express from "express";
import {
  deleteUserById,
  getUsers,
  registerUser,
} from "../controllers/user.controller";

export const userRouter = express.Router();

userRouter.get("/", getUsers);
userRouter.post("/", registerUser);
userRouter.delete("/:id", deleteUserById);
