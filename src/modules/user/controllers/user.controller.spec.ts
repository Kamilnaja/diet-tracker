import { baseURL } from "@shared/helpers/utils";
import { RESPONSE_CODES } from "@shared/models/response-codes.const";
import request from "supertest";
import { UserBuilder } from "../builders/user-builder";

describe("user", () => {
  const partURL = "/users";

  beforeEach(async () => {
    const userEntry = new UserBuilder()
      .setEmail("janusz@gmail.com")
      .setId("1")
      .setName("Janusz")
      .build();

    await request(baseURL).post(partURL).send(userEntry);
  });

  afterEach(async () => {
    await request(baseURL).delete(`${partURL}/1`);
  });

  describe("GET /user", () => {
    it("should return users", async () => {
      await request(baseURL)
        .get(partURL)
        .expect(RESPONSE_CODES.OK)
        .then((resp) => {
          expect(resp.body.data.length).toBe(1);
          expect(resp.body.length).toBe(1);
        });
    });
  });

  describe("DELETE /user", () => {
    it("should delete user", async () => {
      await request(baseURL).delete(`${partURL}/1`).expect(RESPONSE_CODES.OK);
    });
  });
});
