import { NutriScore } from "./nutri-score.enum";
import { IResponse } from "../../shared/models/response.interface";

export interface IFood {
  id: string;
  name: string;
  weight: number;
  caloriesPer100g: number;
  nutriScore?: NutriScore;
}

export type IFoodListResponse = IResponse<IFood>;