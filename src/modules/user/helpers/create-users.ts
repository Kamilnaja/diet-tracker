import { createEmptyResponse } from "@shared/helpers/create-empty-response";
import { shouldLoadInitialData } from "@shared/helpers/utils";
import { UserBuilder } from "../builders/user-builder";
import { UserResponse } from "../models/user-response";
import { User } from "../models/user.interface";

const createNonEmptyUsers = (): User[] => {
  const user1 = new UserBuilder()
    .setEmail("test@example.com")
    .setName("test1")
    .build();

  const users: User[] = [user1];
  return users;
};

export const getInitialUsers = (): UserResponse =>
  shouldLoadInitialData()
    ? new UserResponse(createNonEmptyUsers())
    : createEmptyResponse();
