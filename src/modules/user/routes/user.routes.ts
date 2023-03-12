import express from "express";
import { createUser } from "../controllers/user.controller";

export const userRouter = express.Router();

userRouter.post("/", createUser);
