import { baseURL } from "@shared/helpers/utils";
import request from "supertest";
import { Food } from "../models/food.interface";
import { NutriScore } from "../models/nutri-score.enum";

const newFood: Food = {
  name: "Banana",
  weight: 100,
  nutriScore: NutriScore.D,
  caloriesPer100g: 10,
  id: "10",
  tags: ["1", "2"],
};
const partURL = "/foods";

describe("GET /foods", () => {
  beforeAll(async () => {
    await request(baseURL).post(partURL).send(newFood);
  });

  afterAll(async () => {
    await request(baseURL).delete(`${partURL}/${newFood.id}`);
  });

  it("Should return 200", async () => {
    const response = await request(baseURL).get(partURL);

    expect(response.statusCode).toBe(200);
    expect(!!response.body.error).toBe(false);
    expect(response.body.length).toBe(1);
  });

  it("should find item by string param", async () => {
    await request(baseURL).post(partURL).send(newFood);
    const responseGet = await request(baseURL)
      .get("/foods")
      .query({ name: "banana" });

    expect(responseGet.statusCode).toBe(200);
    expect(
      responseGet.body.data.find((item: Food) => item.name === newFood.name)
    ).not.toBeFalsy();
    expect(responseGet.body.length).toBeGreaterThan(0);
  });

  it("should find item by id", async () => {
    await request(baseURL).post(partURL).send(newFood);

    const response = await request(baseURL).get(`${partURL}/10`);
    const { body } = response;

    expect(response.statusCode).toBe(200);
    expect(body.name).toEqual(newFood.name);
    expect(body.weight).toEqual(newFood.weight);
    expect(body.tags).toEqual(newFood.tags);
  });

  it("should return 204 when couldn't find item by id", async () => {
    const response = await request(baseURL).get(`${partURL}/1001010`);

    expect(response.statusCode).toBe(204);
  });
});

describe("POST /foods", () => {
  it("should not create new food without name", async () => {
    const newFood = {
      id: 1000330300303,
    };
    const response = await request(baseURL).post(partURL).send(newFood);
    expect(response.statusCode).toBe(400);
  });

  it("should create new food with id", async () => {
    const newFood = {
      id: "1000330300303",
      name: "Owsianka",
      weight: 100,
    } as Food;
    const response = await request(baseURL).post(partURL).send(newFood);

    expect([201, 409]).toContain(response.statusCode);

    const responseGet = await request(baseURL).get(partURL);
    const foods: Food[] = responseGet.body.data;
    const createdFood = foods.find((item) => item.id === newFood.id);

    expect(createdFood).not.toBeFalsy();
    expect(createdFood?.name).toEqual(newFood.name);
  });
});

describe("DELETE /foods", () => {
  beforeAll(async () => {
    await request(baseURL).post(partURL).send(newFood);
  });

  it("Should delete one item", async () => {
    await request(baseURL).delete(`${partURL}/${newFood.id}`);
    const response = await request(baseURL).get(partURL);
    const foods = response.body.data;

    const exists = foods.find((food: Food) => {
      newFood.id === food.id;
    });

    expect(exists).toBe(undefined);
  });
});
