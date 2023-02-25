import { NutriScore } from "./nutri-score.enum";
import { IResponse } from "../../shared/models/response.interface";
import { TagId } from "../../dict/models/tag.interface";

export interface IFood {
  id: string;
  name: string;
  weight: number;
  caloriesPer100g: number;
  nutriScore?: NutriScore;
  tags: TagId[];
}

export type IFoodListResponse = IResponse<IFood>;
