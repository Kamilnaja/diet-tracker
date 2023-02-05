import { Diary } from "../../food/builders/diary";

export const createDiary = () => {
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
