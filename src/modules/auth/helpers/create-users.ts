import { createEmptyResponse } from "@shared/helpers/create-empty-response";
import { shouldLoadInitialData } from "@shared/helpers/utils";
import { AuthBuilder } from "../builders/auth.builder";
import { UserResponse } from "../models/user-response";
import { User } from "../models/user.interface";

export const createUsers = (): User[] => {
  const user1 = new AuthBuilder()
    .setEmail("test@example.com")
    .setUserName("test1")
    .setId("1")
    .build();

  const user2 = new AuthBuilder()
    .setEmail("test@example.com")
    .setUserName("test1")
    .setId("2")
    .build();

  const users: User[] = [user1, user2];
  return users;
};
