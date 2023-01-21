import { expect } from "@jest/globals";
const server = require("./index");
const supertest = require("supertest");
const requestWithSupertest = supertest(server);

describe("it should works", () => {
  it("true", () => {
    expect(true).toBe(true);
  });
});
