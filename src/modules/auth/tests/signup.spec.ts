import { baseURL } from "@shared/helpers/utils";
import { RESPONSE_CODES } from "@shared/models/response-codes.const";
import request from "supertest";
import { AuthBuilder } from "../builders/auth.builder";
import { userEntry } from "./signup.mock";

describe("signup", () => {
  const partURL = "/auth/signup";

  beforeEach(async () => {
    await request(baseURL).post(partURL).send(userEntry);
  });

  afterEach(async () => {
    await request(baseURL).delete(`${partURL}/1`);
  });

  describe("POST /signup", () => {
    const userEntry = new AuthBuilder()
      .setEmail("kamil@gmail.com")
      .setUserName("Kamil")
      .setPassword("###")
      .build();

    it("should add one user", async () => {
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

    it("should not allow for adding two the same usernames", async () => {
      await request(baseURL)
        .post(partURL)
        .send(userEntry)
        .then((res) => {
          expect(res.status).toBe(RESPONSE_CODES.BAD_REQUEST);
          expect(res.body).toEqual({
            message: "Username already exists",
          });
        });
    });

    it("should not allow for adding two the same emails", async () => {
      const modifiedUserEntry = { ...userEntry };
      modifiedUserEntry.userName = "Kamil2";

      await request(baseURL)
        .post(partURL)
        .send(modifiedUserEntry)
        .then((res) => {
          expect(res.status).toBe(RESPONSE_CODES.BAD_REQUEST);
          expect(res.body).toEqual({
            message: "Email already exists",
          });
        });
    });
  });
});
