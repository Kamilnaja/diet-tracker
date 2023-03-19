import { Builder } from "@shared/models/builder.interface";
import { Food } from "../../foods/models/food.interface";
import { Diary } from "../models/diary.interface";

export class DiaryBuilder implements Builder<Diary> {
  private _id: string;
  private _date: string;
  private _foods: Food[];

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

  get foods(): Food[] {
    return this._foods;
  }

  setFoods(value: Food[]): DiaryBuilder {
    this._foods = value;
    return this;
  }

  build(): Diary {
    const diary: Diary = {
      id: this._id,
      foods: this._foods,
      date: this._date,
    };
    return diary;
  }
}
