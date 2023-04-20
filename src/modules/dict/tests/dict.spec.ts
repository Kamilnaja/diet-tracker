import { baseURL } from "@shared/helpers/utils";
import { RESPONSE_CODES } from "@shared/models/response-codes.const";
import request from "supertest";

describe("GET /dicts/tags", () => {
  const partURL = "/tags";

  it("should return 200", async () => {
    const response = await request(baseURL).get(`${partURL}/tags`);
    expect(response.statusCode).toBe(RESPONSE_CODES.OK);
    expect(!!response.body.error).toBe(false);
  });
});
