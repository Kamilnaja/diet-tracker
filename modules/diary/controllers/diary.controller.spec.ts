import request from "supertest";
import { IDiary } from "../models/diary.interface";

const baseURL = "http://localhost:8080/api";

describe("GET /diary", () => {
  it("should return empty array", async () => {
    const response = await request(baseURL).get("/foods");
    expect(response.body.data.length).toBeGreaterThan(0);
  });
});

describe("DELETE /diary", () => {
  it("should delete item", async () => {
    const response = await request(baseURL).get("/diary");
    expect(response.body.data.length).toBeGreaterThan(0);

    response.body.data.forEach(async (item: IDiary) => {
      await request(baseURL).delete(`/diary/${item.id}`);
    });

    const responseAfterDelete = await request(baseURL).get("/diary");

    expect(responseAfterDelete.body.data.length).toBe(0);
  });
});
