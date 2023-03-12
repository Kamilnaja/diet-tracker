import { ITag } from "../../dict/models/tag.interface";
import { Food } from "../models/food.interface";
import { NutriScore } from "../models/nutri-score.enum";

export class FoodBuilder {
  private _id: string;
  private _name: string;
  private _weight: number;
  private _caloriesPer100g: number;
  private _nutriScore?: NutriScore;
  private _tags: ITag["id"][];

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
    };
    return food;
  }
}
