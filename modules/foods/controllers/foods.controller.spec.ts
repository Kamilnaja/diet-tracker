import request from "supertest";
import { IFood } from "../models/food.interface";
import { NutriScore } from "../models/nutri-score.enum";
import { Tag } from "../models/tag.interface";

const baseURL = "http://localhost:8080/api";

const newFood: IFood = {
  name: "Banana",
  weight: 100,
  nutriScore: NutriScore.D,
  caloriesPer100g: 10,
  id: "10",
  tags: [Tag.GlutenFree, Tag.Vegan],
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

  it("should find item by string param", async () => {
    await request(baseURL).post("/foods").send(newFood);
    const responseGet = await request(baseURL)
      .get("/foods")
      .query({ name: "banana" });

    expect(responseGet.statusCode).toBe(200);
    expect(
      responseGet.body.data.find((item: IFood) => item.name === newFood.name)
    ).not.toBeFalsy();
    expect(responseGet.body.length).toBeGreaterThan(0);
  });

  it("should find item by id", async () => {
    await request(baseURL).post("/foods").send(newFood);

    const response = await request(baseURL).get("/foods/10");
    const { body } = response;

    expect(response.statusCode).toBe(200);
    expect(body.name).toEqual(newFood.name);
    expect(body.weight).toEqual(newFood.weight);

    // expect(body.tags).toEqual(newFood.tags);
  });

  it("should return 204 when couldn't find item by id", async () => {
    const response = await request(baseURL).get("/foods/1001010");

    expect(response.statusCode).toBe(204);
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
      id: "1000330300303",
      name: "Owsianka",
      weight: 100,
    } as IFood;
    const response = await request(baseURL).post("/foods").send(newFood);

    expect([201, 409]).toContain(response.statusCode);

    const responseGet = await request(baseURL).get("/foods");
    const foods: IFood[] = responseGet.body.data;
    const createdFood = foods.find((item) => item.id === newFood.id);

    expect(createdFood).not.toBeFalsy();
    expect(createdFood?.name).toEqual(newFood.name);
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

    const exists = foods.find((food: IFood) => {
      newFood.id === food.id;
    });

    expect(exists).toBe(undefined);
  });
});
