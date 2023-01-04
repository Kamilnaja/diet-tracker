import { IFoodEntity } from "./food.interface";
import { NutriScore } from "./nutri-score.enum";

export interface IFoodDetails extends IFoodEntity {
  nutriScore?: NutriScore;
}
