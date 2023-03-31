import { Entry } from "@models/entry.interface";
import { HttpResponse } from "@models/http-response.interface";
import { Tag } from "../../dict/models/tag.interface";
import { NutriScore } from "./nutri-score.model";

export interface Food extends Entry {
  caloriesPer100g?: number;
  weight: number;
  nutriScore?: NutriScore;
  tags?: Tag["id"][];
}

export type FoodListResponse = HttpResponse<Food | undefined>;
