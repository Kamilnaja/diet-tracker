import { baseURL } from "@shared/helpers/utils";
import { RESPONSE_CODES } from "@shared/models/response-codes.const";
import request from "supertest";
import { Weight } from "../models/weight.model";

const newWeight: Weight = {
  weight: 80,
  date: "2021-05-01",
};

const partURL = "/weights";

describe("GET /weights", () => {
  beforeAll(async () => {
    await request(baseURL).post(partURL).send(newWeight);
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
    expect(data[0].weight).toBe(newWeight.weight);
    expect(data[0].date).toBe(newWeight.date);
  });

  it("should add weight entry", async () => {
    const response = await request(baseURL).post(partURL).send(newWeight);

    expect(response.statusCode).toBe(RESPONSE_CODES.CREATED);

    const entries = await request(baseURL).get(partURL);

    expect(entries.body.length).toBe(2);
  });

  it("edits weight entry", async () => {
    const response = await request(baseURL)
      .put(`${partURL}/1`)
      .send({ weight: 70 });

    expect(response.statusCode).toBe(RESPONSE_CODES.OK);

    const entries = await request(baseURL).get(partURL);

    expect(entries.body.data[0].weight).toBe(70);
  });

  it("deletes weight entry", async () => {
    const response = await request(baseURL).delete(`${partURL}/1`);

    expect(response.statusCode).toBe(RESPONSE_CODES.OK);

    const entries = await request(baseURL).get(partURL);

    expect(entries.body.length).toBe(1);
  });
});
