import request from "supertest";
import { baseURL } from "../../shared/utils";
import { Diary } from "../builders/diary";

describe("diary", () => {
  const partURL = "/diary";

  beforeEach(async () => {
    const diaryEntry = new Diary()
      .setId("10")
      .setDate("2023-01-01")
      .setFoodIds(["1", "2", "3"])
      .getDiary();

    await request(baseURL).post(partURL).send(diaryEntry);
  });

  afterEach(async () => {
    await request(baseURL).delete(`${partURL}/10`);
  });

  describe("GET /diary", () => {
    it("should return items", async () => {
      await request(baseURL)
        .get(partURL)
        .expect(200)
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
        .expect(200)
        .then((resp) => {
          expect(resp.body.data.length).toBeGreaterThan(0);
        });

      await request(baseURL)
        .get(`${partURL}/10`)
        .expect(200)
        .then((resp) => {
          expect(resp.body.id).toBe("10");
          expect(resp.body.date).toBe("2023-01-01");
          expect(resp.body.foodIds).toEqual(["1", "2", "3"]);
        });

      await request(baseURL).get(`${partURL}/fdasdfads`).expect(204);
    });
  });

  xdescribe("DELETE /diary", () => {
    it("should delete item", async () => {
      await request(baseURL).delete(`${partURL}/10`).expect(201);
    });
  });
});
