import { NutriScore } from "./nutri-score.enum";
import { HttpResponse } from "../../shared/models/http-response.interface";
import { ITag } from "../../dict/models/tag.interface";
import { Entry } from "../../shared/models/entry.interface";

export interface Food extends Entry {
  name?: string;
  caloriesPer100g?: number;
  weight: number;
  nutriScore?: NutriScore;
  tags?: ITag["id"][];
}

export type FoodListResponse = HttpResponse<Food | undefined>;
export type FoodListResponseAll = HttpResponse<Food[] | undefined>;
