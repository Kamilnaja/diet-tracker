export const shouldLoadInitialData = (): boolean => {
  return process.argv.at(-1)?.split("=").at(-1) === "true";
};

export const baseURL = "http://localhost:8081/api";
