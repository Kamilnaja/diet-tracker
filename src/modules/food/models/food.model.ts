import { Entry } from "@shared/models/entry.model";
import { MealType } from "./meal-type.model";
import { NutriScore } from "./nutri-score.model";

export interface BaseFood extends Entry {
  caloriesPer100g?: number;
  weight: number;
  nutriScore?: NutriScore;
  mealType?: MealType;
  photo: string;
}

/**
 * Food with tags as an array
 */
export interface Food extends BaseFood {
  tags?: Tags;
}

/**
 * Food with tags as a string
 */
export interface FoodDb extends BaseFood {
  tags?: string;
}

type Tags = string[];
