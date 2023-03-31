import { Entry } from "@shared/models/entry.model";
import { HttpResponse } from "@shared/models/http-response.model";
import { Tag } from "../../dict/models/tag.interface";
import { MealType } from "./meal-type.model";
import { NutriScore } from "./nutri-score.model";

export interface Food extends Entry {
  caloriesPer100g?: number;
  weight: number;
  nutriScore?: NutriScore;
  tags?: Tag["id"][];
  mealType?: MealType;
}

export type FoodListResponse = HttpResponse<Food | undefined>;
