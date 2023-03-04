import { Food } from "../../foods/models/food.interface";

export interface IDiary {
  id: string;
  foods: Food[];
  date: string;
}
