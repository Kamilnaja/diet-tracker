import express from "express";
import { signin, signout, signup } from "../controllers/signup.controller";
import { checkDuplicateUserData } from "../middleware/check-duplicate-user-data";

export const authRouter = express.Router();

authRouter.post("/signup", checkDuplicateUserData, signup);

authRouter.post("/signin", signin);

authRouter.post("/signout", signout);
