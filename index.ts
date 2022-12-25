import cors from "cors";
import dotenv from "dotenv";
import express, { Request, Response } from "express";
import morgan from "morgan";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
import { Food } from "./models/food";
import { IFood } from "./models/food.interface";
import { IResponse } from "./models/response.interface";

const swaggerDocument = YAML.load("./swagger.yaml");

dotenv.config();

const app = express();
const port = process.env.PORT;
app.use(cors());
morgan("tiny");

const createFoods = (): IResponse<IFood[]> => {
  const cottage = new Food("Cottage Cheese", 180, 100, 1).food;
  const tomato = new Food("Tomato", 100, 50, 2).food;
  const chicken = new Food("Chicken", 100, 50).food;
  const beef = new Food("Chicken", 100, 50).food;

  const foods = [cottage, tomato, chicken, beef];

  return {
    data: foods,
    length: foods.length,
  };
};

let initialFood = createFoods();

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.get("/foods", (req: Request, res: Response) => {
  const response = initialFood;
  res.json(response);
});

app.get("/foods/:id", (req: Request, res: Response) => {
  const id = Number(req.params.id);
  let response: IResponse<IFood | undefined> = {
    data: undefined,
    length: 0,
  };

  let foundItem = initialFood.data.find((item) => item.id === Number(id));

  if (foundItem) {
    response = {
      data: foundItem,
      length: 1,
    };
  }
  res.json(response);
});

app.delete("/foods/:id", (req, res) => {
  const id = Number(req.params.id);
  let response: IResponse<IFood | undefined> = {
    data: undefined,
    length: 0,
  };

  let foundItem = initialFood.data.find((item) => item.id === Number(id));

  if (foundItem) {
    response = {
      data: foundItem,
      length: 1,
    };
    initialFood = {
      data: initialFood.data.filter((item) => item.id !== id),
      length: initialFood.length - 1,
    };
  }
  res.send(response);
});

app.listen(port, () => {
  console.log(`[server]: 🌩️Server is running at https://localhost:${port}`);
});
