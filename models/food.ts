import { IFood } from "./food.interface";

export class Food {
  id = new Date().getTime();
  name: string;
  weight: number;
  caloriesPer100g: number;

  constructor(
    name: string,
    weight: number,
    caloriesPer100g: number,
    id?: number
  ) {
    this.name = name;
    this.weight = weight;
    this.caloriesPer100g = caloriesPer100g;
    id ? (this.id = id) : (this.id = new Date().getTime());
  }

  get food(): IFood {
    return {
      id: this.id,
      name: this.name,
      weight: this.weight,
      caloriesPer100g: this.caloriesPer100g,
    };
  }
}
