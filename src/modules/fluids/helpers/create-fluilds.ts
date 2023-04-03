import { FluidBuilder } from "../builders/fluid.builder";
import { Fluid } from "../models/fluid.interface";

export const createFluids = (): Fluid[] => {
  const tea = new FluidBuilder()
    .setName("tea")
    .setId("1")
    .setCapacity(250)
    .setCaloriesPer100g(0)
    .setIcon("🫖")
    .build();

  const coffee = new FluidBuilder()
    .setName("coffee")
    .setId("2")
    .setCapacity(250)
    .setCaloriesPer100g(0)
    .setIcon("")
    .build();

  const orangeJuice = new FluidBuilder()
    .setName("orangeJuice")
    .setId("2")
    .setCapacity(250)
    .setCaloriesPer100g(50)
    .setIcon("🧋")
    .build();

  return [tea, coffee, orangeJuice];
};
