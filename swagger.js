const swaggerAutogen = require("swagger-autogen")();

const outputFile = "./swagger-output.json";
const endpointsFiles = ["./src/index.ts"];
const doc = {
  host: "localhost:8080",
  info: {
    description: "Awesome app for tracking your diet",
  },
};

swaggerAutogen(outputFile, endpointsFiles, doc);
