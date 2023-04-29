import { AuthBuilder } from "../builders/auth.builder";

export const userEntry = new AuthBuilder()
  .setEmail("janusz@gmail.com")
  .setUserName("Janusz")
  .setPassword("###")
  .build();
