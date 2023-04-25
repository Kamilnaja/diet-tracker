import { Entry } from "@shared/models/entry.model";
import { MealType } from "./meal-type.model";
import { NutriScore } from "./nutri-score.model";

export interface Food extends Entry {
  caloriesPer100g?: number;
  weight: number;
  nutriScore?: NutriScore;
  tags?: string;
  mealType?: MealType;
}
