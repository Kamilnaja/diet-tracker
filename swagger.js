// eslint-disable-next-line @typescript-eslint/no-var-requires, no-undef
const swaggerAutogen = require("swagger-autogen")();

const outputFile = "./swagger-output.json";
const endpointsFiles = ["./src/index.ts"];
const doc = {
  host: "localhost:8080",
  info: {
    description: "Awesome app for tracking your diet",
  },
  definitions: {
    DiaryEntryResponse: {
      id: "39393993",
      $date: "2021-01-01",
      $food: [
        {
          $ref: "#/definitions/FoodInDiary",
        },
      ],
    },
    DiaryEntry: {
      id: "39393993",
      $date: "2021-01-01",
      $food: {
        $ref: "#/definitions/FoodInDiary",
      },
    },
    DiaryPayload: {
      id: "39393993",
      $date: "2021-01-01",
      $food: {
        $ref: "#/definitions/FoodInDiary",
      },
    },
    DiaryResponse: {
      data: [
        {
          $ref: "#/definitions/DiaryEntryResponse",
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
      $weight: 100,
      nutriScore: "E",
      tags: "1, 2",
      photo: "https://www.google.com/image",
    },
    FoodResponse: {
      data: [
        {
          $ref: "#/definitions/FoodEntry",
        },
      ],
      lenght: 10,
    },
    Tag: {
      id: "1",
      name: "Fruit",
    },
    TagsResponse: {
      data: [{ $ref: "#/definitions/Tag" }],
      length: 10,
    },
    WeightEntry: {
      weight: "100",
      date: "2021-01-01",
    },
    Weight: {
      id: "1",
      weight: "100",
      date: "2021-01-01",
    },
    WeightsResponse: {
      data: [{ $ref: "#/definitions/Weight" }],
      length: 10,
    },
    User: {
      userName: "John",
      email: "John@gmail.com",
      password: "123456",
    },
    Settings: {
      user_id: "1",
      height: 180.5,
      age: 30,
      cookieAccepted: true,
      theme: "dark",
      gender: "female",
    },
    SignInUser: {
      userName: "John",
      password: "123456",
    },
    Fluid: {},
    ErrorSearch: {
      message: "Item not found",
    },
    ErrorConflict: {
      message: "Item already exists",
    },
    DeleteSuccess: {
      message: "Item deleted",
    },
  },
};

swaggerAutogen(outputFile, endpointsFiles, doc);
