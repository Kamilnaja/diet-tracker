import { UserBuilder } from "../builders/user.builder";

export const userEntry = new UserBuilder()
  .setEmail("janusz@gmail.com")
  .setUserName("Janusz")
  .setPassword("###")
  .build();
