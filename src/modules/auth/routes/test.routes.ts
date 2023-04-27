import express from "express";
import { user } from "../controllers/test.controller";

export const testRouter = express.Router();

testRouter.post("/user", user);
