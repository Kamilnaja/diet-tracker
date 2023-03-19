import { Entry } from "@shared/models/entry.interface";

export interface Fluid extends Entry {
  caloriesPer100g?: number;
  capacity: number;
  icon: string;
}
