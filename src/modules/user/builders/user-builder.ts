import { User } from "../models/user.interface";

export class UserBuilder {
  private name: string;
  private email: string;
  private password: string;
  private id: string;

  setId(id: string): UserBuilder {
    this.id = id;
    return this;
  }

  setName(name: string): UserBuilder {
    this.name = name;
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
      name: this.name,
      email: this.email,
      password: this.password,
      id: this.id,
    };
  }
}
