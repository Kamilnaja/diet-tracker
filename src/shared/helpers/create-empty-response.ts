import { HttpResponse } from "@shared/models/http-response.interface";

type Response = HttpResponse<any>;

export const createEmptyResponse = (): Response => {
  return {
    data: [],
    length: 0,
  };
};
