import { IFood } from "./models/food.interface";
import { NutriScore } from "./models/nutri-score.enum";

export class Food {
  private _id: string;
  private _name: string;
  private _weight: number;
  private _caloriesPer100g: number;
  private _nutriScore?: NutriScore;

  setId(id: string): Food {
    this._id = id;
    return this;
  }

  setName(name: string): Food {
    this._name = name;
    return this;
  }

  setWeight(weight: number): Food {
    this._weight = weight;
    return this;
  }

  setCaloriesPer100g(calories: number): Food {
    this._caloriesPer100g = calories;
    return this;
  }

  setNutriScore(nutriScore: NutriScore): Food {
    this._nutriScore = nutriScore;
    return this;
  }

  getFood(): IFood {
    const food: IFood = {
      id: this._id,
      name: this._name,
      weight: this._weight,
      caloriesPer100g: this._caloriesPer100g,
      nutriScore: this._nutriScore,
    };
    return food;
  }
}
