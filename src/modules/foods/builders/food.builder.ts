import { Builder } from "@shared/models/builder.model";
import { Tag } from "../../dict/models/tag.interface";
import { Food } from "../models/food.model";
import { MealType } from "../models/meal-type.model";
import { NutriScore } from "../models/nutri-score.model";

export class FoodBuilder implements Builder<Food> {
  private _id: string;
  private _name: string;
  private _weight: number;
  private _caloriesPer100g: number;
  private _nutriScore?: NutriScore;
  private _tags: Tag["id"][];
  private _mealType: MealType;

  setId(id: string): FoodBuilder {
    this._id = id;
    return this;
  }

  setName(name: string): FoodBuilder {
    this._name = name;
    return this;
  }

  setWeight(weight: number): FoodBuilder {
    this._weight = weight;
    return this;
  }

  setCaloriesPer100g(calories: number): FoodBuilder {
    this._caloriesPer100g = calories;
    return this;
  }

  setNutriScore(nutriScore: NutriScore): FoodBuilder {
    this._nutriScore = nutriScore;
    return this;
  }

  setMealType(mealType: MealType): FoodBuilder {
    this._mealType = mealType;
    return this;
  }

  setTags(value: string[]) {
    this._tags = value;
    return this;
  }

  build(): Food {
    const food: Food = {
      id: this._id,
      name: this._name,
      weight: this._weight,
      caloriesPer100g: this._caloriesPer100g,
      nutriScore: this._nutriScore,
      tags: this._tags,
      mealType: this._mealType,
    };
    return food;
  }
}
