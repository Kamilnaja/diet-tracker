import { MealType } from "@modules/foods/models/meal-type.model";

export interface FoodInDiary {
  id: number;
  food_id: number;
  weight: number;
  mealType: MealType;
  dateAdded: string;
}
