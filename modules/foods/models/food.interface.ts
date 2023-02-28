import { NutriScore } from "./nutri-score.enum";
import { IResponse } from "../../shared/models/response.interface";
import { ITag } from "../../dict/models/tag.interface";

export interface IFood {
  id: string;
  name?: string;
  caloriesPer100g?: number;
  weight: number;
  nutriScore?: NutriScore;
  tags?: ITag["id"][];
}

export type IFoodListResponse = IResponse<IFood>;
