import { Builder } from "@shared/models/builder.model";
import { User } from "../models/user.interface";

export class UserBuilder implements Builder<User> {
  private userName: string;
  private email: string;
  private password: string;

  setUserName(userName: string): UserBuilder {
    this.userName = userName;
    return this;
  }

  setEmail(email: string): UserBuilder {
    this.email = email;
    return this;
  }

  setPassword(password: string): UserBuilder {
    this.password = password;
    return this;
  }

  build(): User {
    return {
      userName: this.userName,
      email: this.email,
      password: this.password,
    };
  }
}
