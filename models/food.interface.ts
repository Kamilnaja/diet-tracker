import { NutriScore } from "./nutri-score.enum";
import { IResponse } from "./response.interface";

export interface IFoodEntity {
  id: number;
  name: string;
  weight: number;
  caloriesPer100g: number;
  nutriScore?: NutriScore;
}

export type IFoodListResponse = IResponse<IFoodEntity>;
