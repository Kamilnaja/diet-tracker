import express from "express";
import { signin } from "../controllers/signin.controller";
import {
  deleteAll,
  deleteById,
  signout,
  signup,
} from "../controllers/signup.controller";
import { checkDuplicateUser } from "../middleware/check-duplicate-user";

export const authRouter = express.Router();

authRouter.post("/signup", checkDuplicateUser, signup);

authRouter.delete("/signup/:id", deleteById);

authRouter.delete("/signup", deleteAll);

authRouter.post("/signin", signin);

authRouter.post("/signout", signout);
