import { Builder } from "@shared/models/builder.model";
import { User } from "../models/user.interface";

export class AuthBuilder implements Builder<User> {
  private userName: string;
  private email: string;
  private password: string;
  private id: string;

  setId(id?: string): AuthBuilder {
    this.id = id ? id : new Date().getTime().toString(); // just for testing
    return this;
  }

  setUserName(userName: string): AuthBuilder {
    this.userName = userName;
    return this;
  }

  setEmail(email: string): AuthBuilder {
    this.email = email;
    return this;
  }

  setPassword(password: string): AuthBuilder {
    this.password = password;
    return this;
  }

  build(): User {
    return {
      userName: this.userName,
      email: this.email,
      password: this.password,
      id: this.id,
    };
  }
}
