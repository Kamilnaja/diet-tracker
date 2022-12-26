import { IFood } from "./food.interface";
import { NutriScore } from "./nutri-score.enum";

export class Food {
  id = new Date().getTime();
  name: string;
  weight: number;
  caloriesPer100g: number;
  nutriScore?: NutriScore;

  constructor(
    name: string,
    weight: number,
    caloriesPer100g: number,
    nutriScore?: NutriScore,
    id?: number
  ) {
    this.name = name;
    this.weight = weight;
    this.caloriesPer100g = caloriesPer100g;
    this.nutriScore = nutriScore;
    id ? (this.id = id) : (this.id = new Date().getTime());
  }

  get food(): IFood {
    return {
      id: this.id,
      name: this.name,
      weight: this.weight,
      caloriesPer100g: this.caloriesPer100g,
    };
  }
}
