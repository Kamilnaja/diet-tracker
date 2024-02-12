import { baseURL } from "@shared/helpers/utils";
import request from "supertest";
import { UserSettingsPartial } from "../models/settings.interface";

const newSettings: UserSettingsPartial = {
  user_id: "1",
  height: 180,
  age: 25,
};

const partURL = "/settings";

describe("Settings", () => {
  beforeAll(async () => {
    await request(baseURL).put(partURL).send(newSettings);
  });

  afterAll(async () => {
    await request(baseURL).delete(`${partURL}/1`);
  });

  it("should return 200 when getting settings", async () => {
    const response = await request(baseURL).get(partURL);

    expect(response.statusCode).toBe(200);
  });

  it("should return 204 when editing settings", async () => {
    const response = await request(baseURL).put(partURL).send(newSettings);

    expect(response.statusCode).toBe(204);
  });
});
