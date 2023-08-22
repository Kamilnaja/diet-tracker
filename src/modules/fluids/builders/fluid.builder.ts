import { Builder } from "@shared/models/builder.model";
import { Fluid } from "../models/fluid.interface";

export class FluidBuilder implements Builder<Fluid> {
  private _id: string;
  private _name: string;
  private _capacity: number;
  private _caloriesPer100g: number;
  private _icon: string;

  setId(id: string): FluidBuilder {
    this._id = id;
    return this;
  }

  setName(name: string): FluidBuilder {
    this._name = name;
    return this;
  }

  setCapacity(capacity: number): FluidBuilder {
    this._capacity = capacity;
    return this;
  }

  setCaloriesPer100g(calories: number): FluidBuilder {
    this._caloriesPer100g = calories;
    return this;
  }

  setIcon(icon: string): FluidBuilder {
    this._icon = icon;
    return this;
  }

  build(): Fluid {
    const fluid: Fluid = {
      id: this._id,
      name: this._name,
      capacity: this._capacity,
      caloriesPer100g: this._caloriesPer100g,
      icon: this._icon,
    };
    return fluid;
  }
}
