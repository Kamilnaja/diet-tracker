import { baseURL } from "@shared/helpers/utils";
import { RESPONSE_CODES } from "@shared/models/response-codes.const";
import request from "supertest";
import { DiaryBuilder } from "../builders/diary.builder";
import { FoodInDiary } from "../models/food-in-diary.model";

describe("diary", () => {
  const partURL = "/diary";

  beforeEach(async () => {
    const diaryEntry = new DiaryBuilder()
      .setId("10")
      .setDate("2023-01-01")
      .setFoods([
        { id: "1", weight: 50, mealType: "breakfast", dateAdded: "2020-01-01" },
        { id: "2", weight: 100, mealType: "snack", dateAdded: "2020-01-01" },
        { id: "3", weight: 82, mealType: "dinner", dateAdded: "2021-02-01" },
      ])
      .build();

    await request(baseURL).post(partURL).send(diaryEntry);
  });

  afterEach(async () => {
    await request(baseURL).delete(`${partURL}/10`);
  });

  describe("GET /diary", () => {
    it("should return items", async () => {
      await request(baseURL)
        .get(partURL)
        .expect(RESPONSE_CODES.OK)
        .then((resp) => {
          expect(resp.body.data.length).toBe(1);
          expect(resp.body.length).toBe(1);
        });
    });
  });

  describe("GET /diary:id", () => {
    it("should return one item", async () => {
      await request(baseURL)
        .get(partURL)
        .expect(RESPONSE_CODES.OK)
        .then((resp) => {
          expect(resp.body.data.length).toBe(1);
        });

      await request(baseURL)
        .get(`${partURL}/10`)
        .expect(RESPONSE_CODES.OK)
        .then((resp) => {
          expect(resp.body.id).toBe("10");
          expect(resp.body.date).toBe("2023-01-01");
          expect(resp.body.foods).toEqual([
            { id: "1", weight: 50, mealType: "breakfast" },
            { id: "2", weight: 100, mealType: "snack" },
            { id: "3", weight: 82, mealType: "dinner" },
          ]);
        });

      await request(baseURL)
        .get(`${partURL}/fdasdfads`)
        .expect(RESPONSE_CODES.NOT_FOUND);
    });
  });

  describe("DELETE /diary", () => {
    it("should delete item", async () => {
      await request(baseURL).delete(`${partURL}/10`).expect(RESPONSE_CODES.OK);
    });
  });

  describe("POST /diary/id/food", () => {
    afterEach(async () => {
      await request(baseURL).delete(`${partURL}/10/foods/8`);
    });
    const foodEntry: FoodInDiary = {
      id: "8",
      weight: 100,
      mealType: "dinner",
      dateAdded: "2021-02-01",
    };

    it("should add foods to item", async () => {
      await request(baseURL).post(`${partURL}/10/foods`).send(foodEntry);

      await request(baseURL)
        .get(`${partURL}/10`)
        .expect(RESPONSE_CODES.OK)
        .then((resp) => {
          expect(resp.body.foods.length).toEqual(4);
          expect(resp.body.foods[3]).toEqual(foodEntry);
        });
    });
  });

  describe("DELETE /diary/:id/food/:foodId", () => {
    it("should remove food from diary", async () => {
      await request(baseURL)
        .delete(`${partURL}/10/foods/1`)
        .expect(RESPONSE_CODES.OK);

      await request(baseURL)
        .get(`${partURL}/10`)
        .then((resp) => {
          let { foods } = resp.body;

          expect(foods.length).toEqual(2);
          expect(
            foods.find((food: FoodInDiary) => food.id === "1")
          ).toBeUndefined();
        });
    });
  });
});
