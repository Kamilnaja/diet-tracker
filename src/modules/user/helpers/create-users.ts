import { createEmptyResponse } from "@shared/helpers/create-empty-response";
import { shouldLoadInitialData } from "@shared/helpers/utils";
import { HttpResponse } from "@shared/models/http-response.interface";
import { UserBuilder } from "../builders/user-builder";
import { User } from "../models/user.interface";

type Response = HttpResponse<User[]>;

const createNonEmptyUsers = (): Response => {
  const user1 = new UserBuilder()
    .setEmail("test@example.com")
    .setName("test1")
    .build();

  const users: User[] = [user1];
  return {
    data: users,
    length: users.length,
  };
};

export const getInitialUsers = (): Response =>
  shouldLoadInitialData() ? createNonEmptyUsers() : createEmptyResponse();
