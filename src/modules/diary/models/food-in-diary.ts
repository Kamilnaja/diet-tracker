import { MealType } from "@modules/foods/models/meal-type.model";

export interface FoodInDiary {
  id: string;
  weight: number;
  mealType: MealType;
}
