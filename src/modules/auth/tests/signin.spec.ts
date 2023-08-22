import { baseURL } from "@shared/helpers/utils";
import { RESPONSE_CODES } from "@shared/models/response-codes.const";
import request from "supertest";
import { UserBuilder } from "../builders/user.builder";

describe("POST /signin", () => {
  const signupURL = "/auth/signup";
  const signinURL = "/auth/signin";
  const userEntry = new UserBuilder()
    .setPassword("123")
    .setUserName("Kamil")
    .setEmail("kamil2@gmail.com")
    .build();

  beforeEach(async () => {
    await request(baseURL).post(signupURL).send(userEntry);
  });

  it("should signin user", async () => {
    setTimeout(async () => {
      await request(baseURL)
        .post(signinURL)
        .send(userEntry)
        .then((res) => {
          expect(res.status).toBe(RESPONSE_CODES.OK);
          expect(res.body.message).toBe("User has signed in successfully!");
        });
    });
  });
});
