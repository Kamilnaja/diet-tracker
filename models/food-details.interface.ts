import { IFood } from "./food.interface";
import { NutriScore } from "./nutri-score.enum";

export interface FoodDetails extends IFood {
  nutriScore: NutriScore;
}
