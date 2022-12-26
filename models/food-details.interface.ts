import { IFood } from "./food.interface";
import { NutriScore } from "./nutri-score.enum";

export interface IFoodDetails extends IFood {
  nutriScore?: NutriScore;
}
