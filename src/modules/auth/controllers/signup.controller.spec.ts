import { baseURL } from "@shared/helpers/utils";
import { RESPONSE_CODES } from "@shared/models/response-codes.const";
import request from "supertest";
import { AuthBuilder } from "../builders/auth.builder";

describe("signup", () => {
  const partURL = "/auth/signup";

  beforeEach(async () => {
    const userEntry = new AuthBuilder()
      .setEmail("janusz@gmail.com")
      .setUserName("Janusz")
      .build();

    await request(baseURL).post(partURL).send(userEntry);
  });

  afterEach(async () => {
    await request(baseURL).delete(`${partURL}/1`);
  });

  describe("POST /signup", () => {
    const userEntry = new AuthBuilder()
      .setEmail("kamil@gmail.com")
      .setId("2")
      .setUserName("Kamil")
      .setPassword("###")
      .build();

    it("should add only one the same user", async () => {
      await request(baseURL)
        .post(partURL)
        .send(userEntry)
        .then((res) => {
          expect(res.status).toBe(RESPONSE_CODES.CREATED);
          expect(res.body).toEqual(
            expect.objectContaining({
              email: userEntry.email,
              password: userEntry.password,
              userName: userEntry.userName,
            })
          );
        });
    });

    it("should not add user with the same data", async () => {
      await request(baseURL)
        .post(partURL)
        .send(userEntry)
        .then((res) => {
          expect(res.status).toBe(RESPONSE_CODES.CONFLICT);
          expect(res.body).toEqual({
            message: "Failed! Username is already in use!",
          });
        });
    });
  });
});
