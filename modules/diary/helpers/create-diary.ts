import { IResponse } from "../../shared/models/response.interface";
import { shouldLoadInitialData } from "../../shared/utils";
import { DiaryBuilder } from "../builders/diary";
import { IDiary } from "../models/diary.interface";

type Response = IResponse<IDiary[]>;

const createNonEmptyDiary = (): Response => {
  const day1 = new DiaryBuilder()
    .setId("0")
    .setDate("2022-01-01")
    .setFoods([{ id: "1", weight: 100, tags: [] }])
    .getDiary();
  const day2 = new DiaryBuilder()
    .setId("1")
    .setDate("2022-01-02")
    .setFoods([{ id: "2", weight: 200 }])
    .getDiary();
  const day3 = new DiaryBuilder()
    .setId("2")
    .setDate("2022-01-02")
    .setFoods([{ id: "3", weight: 50 }])
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
