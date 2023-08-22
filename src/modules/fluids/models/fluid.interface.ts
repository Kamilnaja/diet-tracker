import { Entry } from "@shared/models/entry.model";

export interface Fluid extends Entry {
  caloriesPer100g?: number;
  capacity: number;
  icon: string;
}
