import { startDb as db } from "@db/db";
import { authRouter } from "@modules/auth/routes/auth.routes";
import { diaryRouter } from "@modules/diary/routes/diary.routes";
import { dictRouter } from "@modules/dict/routes/dict.routes";
import { fluidsRouter } from "@modules/fluids/routes/fluid.routes";
import { foodRouter } from "@modules/food/routes/food.routes";
import { settingsRouter } from "@modules/settings/routes/settings.routes";
import { weightRouter } from "@modules/weight/routes/weight.routes";
import { shouldLoadInitialData } from "@shared/helpers/utils";
import cookieSession from "cookie-session";
import cors from "cors";
import { corsOptions } from "cors.const";
import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";
import swaggerUi from "swagger-ui-express";
import * as swaggerFile from "../swagger-output.json";
import { foodPrismaRouter } from "./modules/food/routes/food-prisma.routes";
dotenv.config();

const app = express();
const port =
  Number(process.env.PORT) || (shouldLoadInitialData() ? 8082 : 8081);

app.use(cors(corsOptions));
app.use(express.json());
app.use(morgan("tiny"));
app.use(
  cookieSession({
    name: "new-session",
    secret: "COOKIE_SECRET", // should use as secret environment variable, but app is for demo purposes only
    httpOnly: true,
  }),
);
db();
app.use("/api/food", foodRouter);
app.use("/api/prisma/food", foodPrismaRouter);
app.use("/api/diary", diaryRouter);
app.use("/api/dicts", dictRouter);
app.use("/api/auth", authRouter);
app.use("/api/fluids", fluidsRouter);
app.use("/api/weights", weightRouter);
app.use("/api/settings", settingsRouter);
app.use("/", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use(
  cookieSession({
    name: "bezkoder-session",
    secret: "COOKIE_SECRET", // This is not production app, so it's ok to have secret here
    httpOnly: true,
  }),
);

app.listen(port, () => {
  console.log(`[server]: 🌩️Server is running at http://localhost:${port}🐍`);
});

module.exports = db;
