import { use } from "@shared/helpers/utils";
import express from "express";
import { signup } from "../controllers/signup.controller";
import { checkDuplicateUserData } from "../middleware/check-duplicate-user-data";

export const signupRouter = express.Router();

signupRouter.post("/signup", use(checkDuplicateUserData), use(signup));
