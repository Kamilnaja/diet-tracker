import { MealType } from "@modules/foods/models/meal-type.model";
import { Builder } from "@shared/models/builder.model";
import { FoodInDiary } from "../models/food-in-diary.model";

export class FoodInDiaryBuilder implements Builder<FoodInDiary> {
  private _id: string;
  private _weight: number;
  private _mealType: MealType;

  setId(id: string): FoodInDiaryBuilder {
    this._id = id;
    return this;
  }

  setWeight(weight: number): FoodInDiaryBuilder {
    this._weight = weight;
    return this;
  }

  setMealType(mealType: MealType): FoodInDiaryBuilder {
    this._mealType = mealType;
    return this;
  }

  build(): FoodInDiary {
    const foodInDiary: FoodInDiary = {
      id: this._id,
      weight: this._weight,
      mealType: this._mealType,
      dateAdded: new Date().toISOString(),
    };
    return foodInDiary;
  }
}
