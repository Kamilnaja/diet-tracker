import { Builder } from "@shared/models/builder.model";
import { Diary } from "../models/diary.model";
import { FoodInDiary } from "../models/food-in-diary.model";

export class DiaryBuilder implements Builder<Diary> {
  private _id: string;
  private _date: string;
  private _food: FoodInDiary[];

  get id(): string {
    return this._id;
  }

  setId(id: string): DiaryBuilder {
    this._id = id;
    return this;
  }

  get date(): string {
    return this._date;
  }

  setDate(value: string): DiaryBuilder {
    this._date = value;
    return this;
  }

  get food(): FoodInDiary[] {
    return this._food;
  }

  setFood(value: FoodInDiary[]): DiaryBuilder {
    this._food = value;
    return this;
  }

  build(): Diary {
    const diary: Diary = {
      id: this._id,
      food: this._food,
      date: this._date,
    };
    return diary;
  }
}
