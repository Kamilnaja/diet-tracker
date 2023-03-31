import { ApiResponse } from "@shared/models/api-response.model";

export const createEmptyResponse = (): ApiResponse<any> => {
  return new ApiResponse([]);
};
