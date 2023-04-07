const swaggerAutogen = require("swagger-autogen")();

const outputFile = "./swagger-output.json";
const endpointsFiles = ["./src/index.ts"];
const doc = {
  host: "localhost:8080",
  info: {
    description: "Awesome app for tracking your diet",
  },
  definitions: {
    DiaryEntry: {
      id: "39393993",
      $date: "2021-01-01",
      $foods: [
        {
          $ref: "#/definitions/FoodInDiary",
        },
      ],
    },
    DiaryResponse: {
      data: [
        {
          $ref: "#/definitions/DiaryEntry",
        },
      ],
      length: 10,
    },
    FoodInDiary: {
      id: "1",
      weight: 100,
      mealType: "breakfast",
    },
    FoodEntry: {
      $name: "Orange",
      id: "39393993",
      caloriesPer100g: 100,
      weight: 100,
      nutriScore: "E",
      tags: ["1"],
    },
    FoodResponse: {
      data: [
        {
          $ref: "#/definitions/FoodEntry",
        },
      ],
      lenght: 10,
    },
    User: {
      id: "",
      userName: "John",
      email: "John@gmail.com",
      password: "123456",
    },
    Fluid: {},
    ErrorSearch: {
      message: "Item not found",
    },
    ErrorConflict: {
      message: "Item already exists",
    },
  },
};

swaggerAutogen(outputFile, endpointsFiles, doc);
