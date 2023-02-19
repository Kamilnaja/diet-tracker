import { NutriScore } from "./nutri-score.enum";
import { IResponse } from "../../shared/models/response.interface";
import { Tag } from "./tag.interface";

export interface IFood {
  id: string;
  name: string;
  weight: number;
  caloriesPer100g: number;
  nutriScore?: NutriScore;
  tags: Tag[];
}

export type IFoodListResponse = IResponse<IFood>;
