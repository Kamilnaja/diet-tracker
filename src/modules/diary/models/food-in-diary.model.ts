import { MealType } from "@modules/food/models/meal-type.model";

export interface FoodInDiary {
  id: number;
  food_id: number;
  weight: number;
  mealType: MealType;
  dateAdded: string;
  uniqueFoodId: string;
}
