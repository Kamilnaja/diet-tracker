import request from "supertest";
import { baseURL } from "../../shared/utils";
import { Diary } from "../builders/diary";

describe("diary", () => {
  afterAll(async () => {
    await request(baseURL).delete(`${partURL}/10`);
  });

  const partURL = "/diary";

  describe("GET /diary", () => {
    it("should return items", async () => {
      await request(baseURL)
        .get(partURL)
        .expect(200)
        .then((resp) => {
          expect(resp.body.data.length).toBe(3);
          expect(resp.body.length).toBe(3);

          resp.body.data.forEach(async (item: Diary) => {
            await request(baseURL).delete(`${partURL}/${item.id}`);
          });
        });
    });
  });

  describe("GET /diary:id", () => {
    it("should return one item", async () => {
      const newDiaryEntry = new Diary()
        .setId("10")
        .setDate("2023-01-01")
        .setFoodIds(["1", "2", "3"])
        .getDiary();

      await request(baseURL)
        .post(partURL)
        .send(newDiaryEntry)
        .expect(200)
        .then((resp) => {
          expect(resp.body.id).toBe("10");
          expect(resp.body.date).toBe("2023-01-01");
          expect(resp.body.foodIds).toEqual(["1", "2", "3"]);
        });

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

  // describe("DELETE /diary", () => {
  //   it("should delete item", async () => {
  //     const response = await request(baseURL).get(partURL);
  //     expect(response.body.data.length).toBeGreaterThan(0);

  //     response.body.data.forEach(async (item: IDiary) => {
  //       await request(baseURL).delete(`/diary/${item.id}`);
  //     });

  //     const responseAfterDelete = await request(baseURL).get(partURL);

  //     expect(responseAfterDelete.body.data.length).toBe(0);
  //   });
  // });
});
