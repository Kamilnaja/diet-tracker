import express from "express";
import { signup } from "../controllers/auth.controller";
import { checkDuplicateUsernameOrEmail } from "../middleware/verify-sign-up.middleware";

export const authRouter = express.Router();

authRouter.post("/signup", checkDuplicateUsernameOrEmail, signup);
