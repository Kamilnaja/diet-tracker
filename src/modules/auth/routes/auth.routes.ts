import express from "express";
import { signin } from "../controllers/signin.controller";
import { deleteById, signup } from "../controllers/signup.controller";
import { checkDuplicateUserData } from "../middleware/check-duplicate-user-data";

export const authRouter = express.Router();

authRouter.post("/signup", checkDuplicateUserData, signup);

authRouter.delete("/signup/:id", deleteById);

authRouter.post("/signin", signin);

// authRouter.post("/signout", signout);
