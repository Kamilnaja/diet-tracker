import { Entry } from "../shared/models/entry.interface";
import { HttpResponse } from "../shared/models/http-response.interface";

export const findItemIdxById = <T extends Entry>(
  id: string,
  arr: HttpResponse<T[]>
): number => {
  return arr.data.findIndex((item) => item.id === id);
};

export const findItemById = <T extends Entry>(
  id: string,
  arr: HttpResponse<T[]>
): T | undefined => {
  return arr.data.find((item) => item.id === id);
};

export const filterItemById = <T extends Entry>(
  id: string,
  arr: HttpResponse<T[]>
): T[] => {
  return arr.data.filter((item) => item.id !== id);
};
