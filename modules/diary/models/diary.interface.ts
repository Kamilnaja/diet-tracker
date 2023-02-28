import { IFood } from "../../foods/models/food.interface";

export interface IDiary {
  id: string;
  foods: IFood[];
  date: string;
}
