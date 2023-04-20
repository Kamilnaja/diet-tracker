import { createUsers } from "@modules/auth/helpers/create-users";
import { UserResponse } from "@modules/auth/models/user-response";
import { createFluids } from "@modules/fluids/helpers/create-fluilds";
import { FluidResponse } from "@modules/fluids/models/fluid-response";
import { createEmptyResponse } from "./helpers/create-empty-response";
import { shouldLoadInitialData } from "./helpers/utils";

export const getInitialUsers = (): UserResponse =>
  shouldLoadInitialData()
    ? new UserResponse(createUsers())
    : createEmptyResponse();

export const getInitialFluids = (): FluidResponse =>
  shouldLoadInitialData()
    ? new FluidResponse(createFluids())
    : createEmptyResponse();

export const store = {
  initialUsers: getInitialUsers(),
  initialFluids: getInitialFluids(),
};
