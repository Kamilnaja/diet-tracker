import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";
import swaggerUi from "swagger-ui-express";
import { diaryRouter } from "./routes/diary.routes";
import { foodsRouter } from "./routes/foods.routes";
import * as swaggerFile from "./swagger-output.json";

dotenv.config();

const app = express();
const port = process.env.PORT;
app.use(cors());
app.use(express.json());
app.use(morgan("tiny"));

app.use("/api/foods", foodsRouter);
app.use("/api/diary", diaryRouter);
app.use("/", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.listen(port, () => {
  console.log(`[server]: 🌩️Server is running at https://localhost:${port}`);
});
