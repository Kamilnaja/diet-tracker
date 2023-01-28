import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
import { router } from "./routes/foods.routes";
const swaggerDocument = YAML.load("./swagger.yaml");

dotenv.config();

const app = express();
const port = process.env.PORT;
app.use(cors());
app.use(express.json());
app.use(morgan("tiny"));

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use("/api", router);

app.listen(port, () => {
  console.log(`[server]: 🌩️Server is running at https://localhost:${port}`);
});
