import { startDb as db } from "@db/db";
import { authRouter } from "@modules/auth/routes/auth.routes";
import { testRouter } from "@modules/auth/routes/test.routes";
import { diaryRouter } from "@modules/diary/routes/diary.routes";
import { dictRouter } from "@modules/dict/routes/dict.routes";
import { fluidsRouter } from "@modules/fluids/routes/fluid.routes";
import { foodsRouter } from "@modules/foods/routes/foods.routes";
import { shouldLoadInitialData } from "@shared/helpers/utils";
import cookieSession from "cookie-session";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";
import swaggerUi from "swagger-ui-express";
import * as swaggerFile from "../swagger-output.json";
dotenv.config();

const app = express();
const port = shouldLoadInitialData() ? 8080 : 8081;
app.use(cors());
app.use(express.json());
app.use(morgan("tiny"));
app.use(
  cookieSession({
    name: "new-session",
    secret: "COOKIE_SECRET", // should use as secret environment variable, but app is for demo purposes only
    httpOnly: true,
  })
);
db();
app.use("/api/foods", foodsRouter);
app.use("/api/diary", diaryRouter);
app.use("/api/dicts", dictRouter);
app.use("/api/auth", authRouter);
app.use("/api/test", testRouter);
app.use("/api/fluids", fluidsRouter);

app.use("/", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.listen(port, () => {
  console.log(`[server]: 🌩️Server is running at http://localhost:${port}`);
});

module.exports = db;
