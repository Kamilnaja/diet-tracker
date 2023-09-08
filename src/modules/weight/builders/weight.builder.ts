import { Builder } from "@shared/models/builder.model";
import { Weight } from "../models/weight.model";

export class WeightBuilder implements Builder<Weight> {
  private _weight: number;
  private _date: string;

  get weight(): number {
    return this._weight;
  }

  setWeight(value: number): WeightBuilder {
    this._weight = value;
    return this;
  }

  get date(): string {
    return this._date;
  }

  setDate(value: string): WeightBuilder {
    this._date = value;
    return this;
  }

  build(): Weight {
    const weight: Weight = {
      weight: this._weight,
      date: this._date,
    };
    return weight;
  }
}
