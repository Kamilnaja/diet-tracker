import { IFood } from "../../foods/models/food.interface";
import { IDiary } from "../models/diary.interface";

export class Diary {
  private _id: string;
  private _date: string;
  private _foods: IFood[];

  get id(): string {
    return this._id;
  }

  setId(id: string): Diary {
    this._id = id;
    return this;
  }

  get date(): string {
    return this._date;
  }

  setDate(value: string): Diary {
    this._date = value;
    return this;
  }

  get foods(): IFood[] {
    return this._foods;
  }

  setFoods(value: IFood[]): Diary {
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
