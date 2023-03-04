import { NutriScore } from "./nutri-score.enum";
import { HttpResponse } from "../../shared/models/http-response.interface";
import { ITag } from "../../dict/models/tag.interface";

export interface Food {
  id: string;
  name?: string;
  caloriesPer100g?: number;
  weight: number;
  nutriScore?: NutriScore;
  tags?: ITag["id"][];
}

export type FoodListResponse = HttpResponse<Food>;
