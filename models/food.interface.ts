import { NutriScore } from "./nutri-score.enum";

export interface IFood {
  id: number;
  name: string;
  weight: number;
  caloriesPer100g: number;
  nutriScore?: NutriScore;
}
