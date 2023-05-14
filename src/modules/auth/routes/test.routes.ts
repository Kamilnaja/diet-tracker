import express from "express";
import { userBoard } from "../controllers/test.controller";
import { verifyToken } from "../middleware/auth-jwt";

export const testRouter = express.Router();

testRouter.get("/test/user", verifyToken as any, userBoard);

testRouter.get("/test/mod", (req, res) => {
  res.send("Content for mod");
});

testRouter.get("/test/admin", (req, res) => {
  res.send("Content for mod");
});
