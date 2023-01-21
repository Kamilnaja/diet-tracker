import request from "supertest";
import { IFoodEntity } from "../models/food.interface";
import { NutriScore } from "../models/nutri-score.enum";

const baseURL = "http://localhost:8080/api";

const newFood: IFoodEntity = {
  name: "Banana",
  weight: 100,
  nutriScore: NutriScore.D,
  caloriesPer100g: 10,
  id: 10,
};

describe("GET /foods", () => {
  beforeAll(async () => {
    await request(baseURL).post("/foods").send(newFood);
  });

  afterAll(async () => {
    await request(baseURL).delete(`/foods/${newFood.id}`);
  });

  it("Should return 200", async () => {
    const response = await request(baseURL).get("/foods");

    expect(response.statusCode).toBe(200);
    expect(!!response.body.error).toBe(false);
    expect(response.body.length).toBeGreaterThan(0);
  });
});

describe("POST /foods", () => {
  it("should not create new food without name", async () => {
    const newFood = {
      id: 1000330300303,
    };
    const response = await request(baseURL).post("/foods").send(newFood);
    expect(response.statusCode).toBe(400);
  });

  it("should create new food with id", async () => {
    const newFood = {
      id: 1000330300303,
      name: "Owsianka",
      weight: 100,
    } as IFoodEntity;
    const response = await request(baseURL).post("/foods").send(newFood);
    expect(response.statusCode).toBe(201);

    const responseGet = await request(baseURL).get("/foods");
    const foods: IFoodEntity[] = responseGet.body.data;

    const exists = foods.find((item) => item.id === newFood.id);
    expect(exists).not.toBeFalsy();
  });
});

describe("DELETE /foods", () => {
  beforeAll(async () => {
    await request(baseURL).post("/foods").send(newFood);
  });

  it("Should delete one item", async () => {
    await request(baseURL).delete(`/foods/${newFood.id}`);
    const response = await request(baseURL).get("/foods");
    const foods = response.body.data;

    const exists = foods.find((food: IFoodEntity) => {
      newFood.id === food.id;
    });

    expect(exists).toBe(undefined);
  });
});
