export const shouldLoadInitialData = () => {
  return process.argv.at(-1)?.split("=").at(-1) === "true" ? true : false;
};

export const baseURL = "http://localhost:8081/api";
