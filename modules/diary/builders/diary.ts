import { IFood } from "../../foods/models/food.interface";
import { IDiary } from "../models/diary.interface";

export class DiaryBuilder {
  private _id: string;
  private _date: string;
  private _foods: IFood[];

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

  get foods(): IFood[] {
    return this._foods;
  }

  setFoods(value: IFood[]): DiaryBuilder {
    this._foods = value;
    return this;
  }

  getDiary(): IDiary {
    const diary: IDiary = {
      id: this._id,
      foods: this._foods,
      date: this._date,
    };
    return diary;
  }
}
