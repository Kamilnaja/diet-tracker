import { IDiary } from "../models/diary.interface";

export class Diary {
  private _id: string;
  private _date: string;
  private _foodIds: string[];

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

  get foodIds(): string[] {
    return this._foodIds;
  }

  setFoodIds(value: string[]): Diary {
    this._foodIds = value;
    return this;
  }

  getDiary(): IDiary {
    const diary: IDiary = {
      id: this._id,
      foodsIds: this._foodIds,
      date: this._date,
    };
    return diary;
  }
}
