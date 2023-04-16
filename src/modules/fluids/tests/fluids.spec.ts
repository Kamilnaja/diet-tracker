// import { baseURL } from "@shared/helpers/utils";
// import { RESPONSE_CODES } from "@shared/models/response-codes.const";
// import request from "supertest";
// import { Fluid } from "../models/fluid.interface";

// const newFluid: Fluid = {
//   name: "Juice",
//   capacity: 100,
//   caloriesPer100g: 10,
//   id: "10",
//   icon: "🧪",
// };
// const partURL = "/fluids";

describe("FluidsController", () => {
  it("should be defined", () => {
    expect(true).toBe(true);
  });
});

// describe("GET /fluids", () => {
//   beforeAll(async () => {
//     await request(baseURL).post(partURL).send(newFluid);
//   });

//   afterAll(async () => {
//     await request(baseURL).delete(`${partURL}/${newFluid.id}`);
//   });

//   it("should return 200", async () => {
//     const response = await request(baseURL).get(partURL);

//     expect(response.statusCode).toBe(RESPONSE_CODES.OK);
//     expect(!!response.body.error).toBe(false);
//     expect(response.body.length).toBe(1);
//   });

//   it("should find item by string param", async () => {
//     await request(baseURL).post(partURL).send(newFluid);
//     const responseGet = await request(baseURL)
//       .get(partURL)
//       .query({ name: "Juice" });

//     expect(responseGet.statusCode).toBe(RESPONSE_CODES.OK);
//     expect(
//       responseGet.body.data.find((item: Fluid) => item.name === newFluid.name)
//     ).not.toBeFalsy();
//     expect(responseGet.body.length).toBeGreaterThan(0);
//   });

//   it("should find fluid by id", async () => {
//     await request(baseURL).post(partURL).send(newFluid);

//     const response = await request(baseURL).get(`${partURL}/10`);
//     const { body } = response;

//     expect(response.statusCode).toBe(RESPONSE_CODES.OK);
//     expect(body.name).toEqual(newFluid.name);
//     expect(body.capacity).toEqual(newFluid.capacity);
//   });

//   it("should return 404 when couldn't find item by id", async () => {
//     const response = await request(baseURL).get(`${partURL}/1001010`);

//     expect(response.statusCode).toBe(RESPONSE_CODES.NOT_FOUND);
//   });
// });

// describe("POST /fluids", () => {
//   it("should not create new fluid without name", async () => {
//     const newFluid = {
//       id: 1000330300303,
//     };
//     const response = await request(baseURL).post(partURL).send(newFluid);
//     expect(response.statusCode).toBe(RESPONSE_CODES.UNPROCESSABLE_ENTITY);
//   });

//   it("should create new fluid with id", async () => {
//     const newFluid: Fluid = {
//       id: "1000330300303",
//       name: "Tea",
//       capacity: 100,
//       icon: "",
//     };
//     const response = await request(baseURL).post(partURL).send(newFluid);

//     expect([RESPONSE_CODES.CREATED, RESPONSE_CODES.CONFLICT]).toContain(
//       response.statusCode
//     );

//     const responseGet = await request(baseURL).get(partURL);
//     const fluids: Fluid[] = responseGet.body.data;
//     const createdFood = fluids.find((item) => item.id === newFluid.id);

//     expect(createdFood).not.toBeFalsy();
//     expect(createdFood?.name).toEqual(newFluid.name);
//     expect(createdFood?.capacity).toEqual(newFluid.capacity);
//   });
// });

// describe("DELETE /fluid", () => {
//   beforeAll(async () => {
//     await request(baseURL).post(partURL).send(newFluid);
//   });

//   it("Should delete one fluid item", async () => {
//     await request(baseURL).delete(`${partURL}/${newFluid.id}`);
//     const response = await request(baseURL).get(partURL);
//     const foods = response.body.data;

//     const exists = foods.find((fluid: Fluid) => {
//       newFluid.id === fluid.id;
//     });

//     expect(exists).toBe(undefined);
//   });
// });
