import { Error } from "@models/error";
import { Request, Response } from "express";
import { UserBuilder } from "../builders/user-builder";
import { getInitialUsers } from "../helpers/create-users";

const initialUsers = getInitialUsers();

export const createUser = (req: Request, res: Response) => {
  // #swagger.tags = ['User']

  const { name, email, password } = req.body;

  // Walidacja danych
  if (!name || !email || !password) {
    return res.status(400).json(Error.getError("Missing data"));
  }

  // Tworzenie użytkownika
  const newUser = new UserBuilder()
    .setEmail(email)
    .setPassword(password)
    .setName(name)
    .build();

  initialUsers.data.push(newUser);
  initialUsers.length++;

  res.send(newUser);
};
