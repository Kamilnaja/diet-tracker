import { createUsers } from "@modules/auth/helpers/create-users";
import { UserResponse } from "@modules/auth/models/user-response";
import { createDiary } from "@modules/diary/helpers/create-diary";
import { DiaryResponse } from "@modules/diary/models/diary-response";
import { createFluids } from "@modules/fluids/helpers/create-fluilds";
import { FluidResponse } from "@modules/fluids/models/fluid-response";
import { createFoods } from "@modules/foods/helpers/create-foods";
import { FoodResponse } from "@modules/foods/models/food-response";
import { createEmptyResponse } from "./helpers/create-empty-response";
import { shouldLoadInitialData } from "./helpers/utils";

export const getInitialFoods = (): FoodResponse =>
  shouldLoadInitialData()
    ? new FoodResponse(createFoods())
    : createEmptyResponse();

export const getInitialUsers = (): UserResponse =>
  shouldLoadInitialData()
    ? new UserResponse(createUsers())
    : createEmptyResponse();

export const getInitialDiary = (): DiaryResponse => {
  return shouldLoadInitialData()
    ? new DiaryResponse(createDiary())
    : createEmptyResponse();
};

export const getInitialFluids = (): FluidResponse =>
  shouldLoadInitialData()
    ? new FluidResponse(createFluids())
    : createEmptyResponse();

export const store = {
  initialFoods: getInitialFoods(),
  initialUsers: getInitialUsers(),
  initialDiary: getInitialDiary(),
  initialFluids: getInitialFluids(),
};
