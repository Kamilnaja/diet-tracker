import { Error } from "@models/error";
import { Request, Response } from "express";
import { UserBuilder } from "../builders/user-builder";
import { getInitialUsers } from "../helpers/create-users";

const initialUsers = getInitialUsers();

export const registerUser = (req: Request, res: Response) => {
  // #swagger.tags = ['User']

  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json(Error.getError("Missing data"));
  }

  if (initialUsers.find("name", name)) {
    return res.status(400).json(Error.getError("Username already exists"));
  }

  if (initialUsers.find("email", email)) {
    return res.status(400).json(Error.getError("Email already exists"));
  }

  const newUser = new UserBuilder()
    .setEmail(email)
    .setPassword(password)
    .setName(name)
    .build();

  initialUsers.add(newUser);

  res.send(newUser);
};
