import { createEmptyResponse } from "@shared/helpers/create-empty-response";
import { shouldLoadInitialData } from "@shared/helpers/utils";
import { DiaryBuilder } from "../builders/diary-builder";
import { DiaryResponse } from "../models/diary-response";
import { Diary } from "../models/diary.interface";

const createDiary = (): Diary[] => {
  const day1 = new DiaryBuilder()
    .setId("0")
    .setDate("2022-01-01")
    .setFoods([{ id: "1", weight: 100, tags: [] }])
    .build();
  const day2 = new DiaryBuilder()
    .setId("1")
    .setDate("2022-01-02")
    .setFoods([{ id: "2", weight: 200 }])
    .build();
  const day3 = new DiaryBuilder()
    .setId("2")
    .setDate("2022-01-02")
    .setFoods([{ id: "3", weight: 50 }])
    .build();

  const days = [day1, day2, day3];

  return days;
};

export const getInitialDiary = (): DiaryResponse =>
  shouldLoadInitialData()
    ? new DiaryResponse(createDiary())
    : createEmptyResponse();
