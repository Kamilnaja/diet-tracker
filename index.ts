import dotenv from "dotenv";
import express, { Request, Response } from "express";
import { runSequelize } from "./db/sequelize";

dotenv.config();

const app = express();
const port = process.env.PORT;

runSequelize();

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.listen(port, () => {
  console.log(`[server]: 🌩️Server is running at https://localhost:${port}`);
});
