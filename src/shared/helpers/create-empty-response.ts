import { ApiResponse } from "@shared/models/api-response";

export const createEmptyResponse = (): ApiResponse<any> => {
  return new ApiResponse([]);
};
