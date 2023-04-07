import { DiaryBuilder } from "../builders/diary.builder";
import { Diary } from "../models/diary.model";

export const createDiary = (): Diary[] => {
  const day1 = new DiaryBuilder()
    .setId("0")
    .setDate("2022-01-01")
    .setFoods([{ id: "1", weight: 100, mealType: "breakfast" }])
    .build();
  const day2 = new DiaryBuilder()
    .setId("1")
    .setDate("2022-01-02")
    .setFoods([{ id: "2", weight: 200, mealType: "snack" }])
    .build();
  const day3 = new DiaryBuilder()
    .setId("2")
    .setDate("2022-01-02")
    .setFoods([{ id: "3", weight: 50, mealType: "training" }])
    .build();

  const days = [day1, day2, day3];

  return days;
};
