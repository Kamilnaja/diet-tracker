import { ApiResponse } from "@shared/models/api-response.model";
import { Entry } from "@shared/models/entry.model";

export const createEmptyResponse = <T extends Entry>(): ApiResponse<T> => {
  return new ApiResponse([]);
};
