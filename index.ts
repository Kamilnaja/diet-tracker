import dotenv from "dotenv";
import express, { Request, Response } from "express";
import { assertDatabaseConnectionOk, initDb } from "./db/sequelize";

dotenv.config();

const app = express();
const port = process.env.PORT;

assertDatabaseConnectionOk();

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.listen(port, async () => {
  await assertDatabaseConnectionOk();
  await initDb();
  console.log(`[server]: 🌩️Server is running at https://localhost:${port}`);
});
