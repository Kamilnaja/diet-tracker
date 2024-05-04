import { baseURL } from "@shared/helpers/utils";
import { RESPONSE_CODES } from "@shared/models/response-codes.const";
import request from "supertest";
import { FoodInDiary } from "../models/food-in-diary.model";

describe("diary", () => {
  const partURL = "/diary";

  beforeEach(async () => {
    const diaryEntry = {
      date: "2023-01-01",
      food: {
        id: 1,
        food_id: 1,
        name: "Apple",
        weight: 100,
        nutriScore: "A",
        caloriesPer100g: 10,
        tags: [1],
        mealType: "breakfast",
      },
    };

    await request(baseURL).post(partURL).send(diaryEntry);
  });

  afterEach(async () => {
    await request(baseURL).delete(`${partURL}/1`);
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

    it("should find diary items by date", async () => {
      await request(baseURL)
        .get(`${partURL}?date=2023-01-01`)
        .expect(RESPONSE_CODES.OK)
        .then((resp) => {
          expect(resp.body.data.length).toBe(1);
          expect(resp.body.length).toBe(1);
        });

      await request(baseURL)
        .get(`${partURL}?date=2023-01-02`)
        .expect(RESPONSE_CODES.OK)
        .then((resp) => {
          expect(resp.body.data.length).toBe(0);
          expect(resp.body.length).toBe(0);
        });
    });
  });

  it("should throw error when searching diary items by wrong date", async () => {
    await request(baseURL)
      .get(`${partURL}?date=20233-01-01`)
      .expect(RESPONSE_CODES.BAD_REQUEST)
      .then((resp) => {
        expect(resp.body.message).toBe("Invalid date");
      });
  });

  describe("GET /diary/id", () => {
    it("should return one item", async () => {
      await request(baseURL)
        .get(`${partURL}/1`)
        .expect(RESPONSE_CODES.OK)
        .then((resp) => {
          const { body } = resp;
          expect(body.id).toBe("1");
          expect(body.date).toBe("2023-01-01");
          expect(body.food[0].id).toEqual(1);
          expect(body.food[0].mealType).toEqual("breakfast");
          expect(body.food[0].weight).toEqual(100);
          expect(body.food[0].food_id).toEqual(1);
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

  describe("POST /diary/", () => {
    afterEach(async () => {
      await request(baseURL).delete(`${partURL}/10/food/8`);
    });

    it("should add food to diary item", async () => {
      await request(baseURL)
        .post(`${partURL}/`)
        .send({
          date: "2024-01-01",
          food: {
            id: "12",
            weight: 100,
            mealType: "lunch",
          },
        });

      await request(baseURL)
        .get(`${partURL}/?date=2024-01-01`)
        .expect(RESPONSE_CODES.OK)
        .then((resp) => {
          const { food } = resp.body.data.at(-1);
          expect(food.length).toEqual(1);
          expect(food[0]).toEqual(
            expect.objectContaining({
              id: 12,
              mealType: "lunch",
              weight: 100,
              food_id: 12,
              uniqueFoodId: 7,
            })
          );
        });
    });
  });

  describe("DELETE /diary/:id/food/:foodId", () => {
    it("should remove food from diary", async () => {
      await request(baseURL)
        .delete(`${partURL}/1/food/1`)
        .expect(RESPONSE_CODES.OK);

      await request(baseURL)
        .get(`${partURL}/1`)
        .then((resp) => {
          const { food } = resp.body;

          expect(food.length).toEqual(1);
          expect(
            food.find((food: FoodInDiary) => food.id === 1).food
          ).toBeUndefined();
        });
    });
  });
});
