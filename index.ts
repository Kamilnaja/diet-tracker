import { diaryRouter } from "@modules/diary/routes/diary.routes";
import { dictRouter } from "@modules/dict/routes/dict.routes";
import { foodsRouter } from "@modules/foods/routes/foods.routes";
import { shouldLoadInitialData } from "@shared/helpers/utils";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";
import swaggerUi from "swagger-ui-express";
import * as swaggerFile from "./swagger-output.json";

dotenv.config();

const app = express();
const port = shouldLoadInitialData() ? 8080 : 8081;
app.use(cors());
app.use(express.json());
app.use(morgan("tiny"));

app.use("/api/foods", foodsRouter);
app.use("/api/diary", diaryRouter);
app.use("/api/dicts", dictRouter);

app.use("/", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.listen(port, () => {
  console.log(`[server]: 🌩️Server is running at https://localhost:${port}`);
});
