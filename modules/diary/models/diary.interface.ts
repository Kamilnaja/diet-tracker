import { Food } from "../../foods/models/food.interface";

export interface Diary {
  id: string;
  foods: Food[];
  date: string;
}
