import { IResponse } from "../../shared/models/response.interface";
import { shouldLoadInitialData } from "../../shared/utils";
import { Diary } from "../builders/diary";
import { IDiary } from "../models/diary.interface";

type Response = IResponse<IDiary[]>;

const createNonEmptyDiary = (): Response => {
  const day1 = new Diary()
    .setId("0")
    .setDate("2022-01-01")
    .setFoodIds(["1"])
    .getDiary();
  const day2 = new Diary()
    .setId("1")
    .setDate("2022-01-02")
    .setFoodIds(["2"])
    .getDiary();
  const day3 = new Diary()
    .setId("2")
    .setDate("2022-01-02")
    .setFoodIds(["3"])
    .getDiary();

  const days = [day1, day2, day3];

  return {
    data: days,
    length: days.length,
  };
};

const createEmptyDiary = (): Response => {
  return {
    data: [],
    length: 0,
  };
};

export const getInitialDiary = (): Response =>
  shouldLoadInitialData() ? createNonEmptyDiary() : createEmptyDiary();
