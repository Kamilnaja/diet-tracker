import { createEmptyResponse } from "@shared/helpers/create-empty-response";
import { shouldLoadInitialData } from "@shared/helpers/utils";
import { FluidBuilder } from "../builders/fluid.builder";
import { FluidResponse } from "../models/fluid-response";
import { Fluid } from "../models/fluid.interface";

const createFluids = (): Fluid[] => {
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

export const getInitialFluids = (): FluidResponse =>
  shouldLoadInitialData()
    ? new FluidResponse(createFluids())
    : createEmptyResponse();
