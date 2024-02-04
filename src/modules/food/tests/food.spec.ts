import { baseURL } from "@shared/helpers/utils";
import { RESPONSE_CODES } from "@shared/models/response-codes.const";
import request from "supertest";
import { Food } from "../models/food.model";

const newFood: Food = {
  name: "Banana",
  weight: 100,
  nutriScore: "D",
  caloriesPer100g: 10,
  tags: "1,2",
  mealType: "breakfast",
  photo: "https://pl.wikipedia.org/wiki/Plik:Banana-Single.jpg",
};
const partURL = "/food";

describe("GET /food", () => {
  beforeAll(async () => {
    await request(baseURL).post(partURL).send(newFood);
  });

  afterAll(async () => {
    await request(baseURL).delete(`${partURL}/1`);
  });

  it("should return 200 when getting all items", async () => {
    const response = await request(baseURL).get(partURL);

    expect(response.statusCode).toBe(RESPONSE_CODES.OK);

    const { data } = response.body;

    expect(!!response.body.error).toBe(false);
    expect(response.body.length).toBe(1);
    expect(data.length).toBeGreaterThan(0);
    expect(data[0].name).toBe(newFood.name);
    expect(data[0].weight).toBe(newFood.weight);
    expect(data[0].nutriScore).toBe(newFood.nutriScore);
    expect(data[0].caloriesPer100g).toBe(newFood.caloriesPer100g);
    expect(data[0].tags).toEqual(newFood.tags);
    expect(data[0].photo).toEqual(newFood.photo);
  });

  it("should find item by name", async () => {
    const response = await request(baseURL).get(
      `${partURL}/search?name=Banana`
    );
    const { data } = response.body;

    expect(response.statusCode).toBe(RESPONSE_CODES.OK);
    expect(data.length).toBeGreaterThan(0);
    expect(data[0].name).toBe(newFood.name);
    expect(data[0].weight).toBe(newFood.weight);
    expect(data[0].nutriScore).toBe(newFood.nutriScore);
    expect(data[0].caloriesPer100g).toBe(newFood.caloriesPer100g);
    expect(data[0].tags).toEqual(newFood.tags);
    expect(data[0].photo).toEqual(newFood.photo);
  });

  it("should find item by tag", async () => {
    const response = await request(baseURL).get(`${partURL}/search?tag=1`);
    const { data } = response.body;

    expect(response.statusCode).toBe(RESPONSE_CODES.OK);
    expect(data.length).toBeGreaterThan(0);
    expect(data[0].name).toBe(newFood.name);
    expect(data[0].weight).toBe(newFood.weight);
    expect(data[0].nutriScore).toBe(newFood.nutriScore);
    expect(data[0].caloriesPer100g).toBe(newFood.caloriesPer100g);
    expect(data[0].tags).toEqual(newFood.tags);
  });

  it("should find item by tag & name", async () => {
    const response = await request(baseURL).get(
      `${partURL}/search?tag=1&name=Banana`
    );
    const { data } = response.body;

    expect(response.statusCode).toBe(RESPONSE_CODES.OK);
    expect(data.length).toBeGreaterThan(0);
    expect(data[0].name).toBe(newFood.name);
    expect(data[0].weight).toBe(newFood.weight);
    expect(data[0].nutriScore).toBe(newFood.nutriScore);
    expect(data[0].caloriesPer100g).toBe(newFood.caloriesPer100g);
    expect(data[0].tags).toEqual(newFood.tags);
  });

  it("should return empty response when searching for non-existing items", async () => {
    const response = await request(baseURL).get(
      `${partURL}/search?tag=1333&name=Bananadadfd`
    );
    const { data } = response.body;

    expect(response.statusCode).toBe(RESPONSE_CODES.OK);
    expect(data).toEqual([]);
    expect(data.length).toBe(0);
  });

  it("should find item by string param", async () => {
    await request(baseURL).post(partURL).send(newFood);
    const responseGet = await request(baseURL)
      .get(partURL)
      .query({ name: "banana" });

    expect(responseGet.statusCode).toBe(RESPONSE_CODES.OK);
    expect(
      responseGet.body.data.find((item: Food) => item.name === newFood.name)
    ).not.toBeFalsy();

    expect(responseGet.body.length).toBeGreaterThan(0);
    const { data } = responseGet.body;
    expect(data.length).toBeGreaterThan(0);
    expect(data[0].name).toBe(newFood.name);
    expect(data[0].weight).toBe(newFood.weight);
    expect(data[0].nutriScore).toBe(newFood.nutriScore);
    expect(data[0].caloriesPer100g).toBe(newFood.caloriesPer100g);
    expect(data[0].tags).toEqual(newFood.tags);
  });

  it("should find item by id", async () => {
    const response = await request(baseURL).get(`${partURL}/1`);
    const { body } = response;

    expect(response.statusCode).toBe(RESPONSE_CODES.OK);
    expect(body.name).toEqual(newFood.name);
    expect(body.weight).toEqual(newFood.weight);
    expect(body.nutriScore).toEqual(newFood.nutriScore);
    expect(body.caloriesPer100g).toEqual(newFood.caloriesPer100g);
    expect(body.tags).toEqual(newFood.tags);
  });

  it("should return 200 when couldn't find item by id", async () => {
    const response = await request(baseURL).get(`${partURL}/1001010`);

    expect(response.statusCode).toBe(RESPONSE_CODES.OK);
    expect(response.body).toEqual({});
  });
});

describe("POST /food", () => {
  it("should not create new food without name", async () => {
    const newFood = {
      id: 1000330300303,
    };
    const response = await request(baseURL).post(partURL).send(newFood);
    expect(response.statusCode).toBe(RESPONSE_CODES.UNPROCESSABLE_ENTITY);
  });
});

describe("DELETE /food", () => {
  beforeAll(async () => {
    await request(baseURL).post(partURL).send(newFood);
  });

  it("Should delete one item", async () => {
    await request(baseURL).delete(`${partURL}/${newFood.id}`);
    const response = await request(baseURL).get(partURL);
    const food = response.body.data;

    const exists = food.find((food: Food) => {
      newFood.id === food.id;
    });

    expect(exists).toBe(undefined);
  });
});
