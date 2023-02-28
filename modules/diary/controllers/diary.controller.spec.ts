import request from "supertest";
import { baseURL } from "../../shared/utils";
import { Diary } from "../builders/diary";

describe("diary", () => {
  const partURL = "/diary";

  beforeEach(async () => {
    const diaryEntry = new Diary()
      .setId("10")
      .setDate("2023-01-01")
      .setFoods([
        { id: "1", weight: 50 },
        { id: "2", weight: 100 },
        { id: "3", weight: 82 },
      ])
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
          expect(resp.body.data.length).toBe(1);
        });

      await request(baseURL)
        .get(`${partURL}/10`)
        .expect(200)
        .then((resp) => {
          expect(resp.body.id).toBe("10");
          expect(resp.body.date).toBe("2023-01-01");
          expect(resp.body.foods).toEqual([
            { id: "1", weight: 50 },
            { id: "2", weight: 100 },
            { id: "3", weight: 82 },
          ]);
        });

      await request(baseURL).get(`${partURL}/fdasdfads`).expect(204);
    });
  });

  describe("DELETE /diary", () => {
    it("should delete item", async () => {
      await request(baseURL).delete(`${partURL}/10`).expect(200);
    });
  });
});
