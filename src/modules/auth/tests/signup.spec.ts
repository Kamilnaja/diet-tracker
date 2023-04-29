import { baseURL } from "@shared/helpers/utils";
import { RESPONSE_CODES } from "@shared/models/response-codes.const";
import request from "supertest";
import { UserBuilder } from "../builders/user.builder";
import { userEntry } from "./signup.mock";

describe("signup", () => {
  const signupURL = "/auth/signup";

  beforeEach(async () => {
    await request(baseURL).post(signupURL).send(userEntry);
  });

  afterEach(async () => {
    await request(baseURL).delete(`${signupURL}/1`);
  });

  describe("POST /signup", () => {
    const userEntry = new UserBuilder()
      .setEmail("kamil@gmail.com")
      .setUserName("Kamil2")
      .setPassword("123")
      .build();

    it("should add one user", async () => {
      await request(baseURL)
        .post(signupURL)
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
      const modifiedUserEntry = { ...userEntry };
      modifiedUserEntry.email = "unique123@gmail.com";

      await request(baseURL)
        .post(signupURL)
        .send(modifiedUserEntry)
        .then((res) => {
          expect(res.status).toBe(RESPONSE_CODES.BAD_REQUEST);
          expect(res.body).toEqual({
            message: "Username already exists",
          });
        });
    });

    it("should not allow for adding two the same emails", async () => {
      const modifiedUserEntry = { ...userEntry };
      modifiedUserEntry.userName = "unique123";

      await request(baseURL)
        .post(signupURL)
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
