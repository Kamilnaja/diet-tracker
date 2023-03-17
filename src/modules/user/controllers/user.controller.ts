import { Error } from "@models/error";
import { HttpResponse } from "@shared/models/http-response.interface";
import { Request, Response } from "express";
import { UserBuilder } from "../builders/user-builder";
import { getInitialUsers } from "../helpers/create-users";
import { User } from "../models/user.interface";

const initialUsers = getInitialUsers();

export const registerUser = (req: Request, res: Response) => {
  // #swagger.tags = ['User']
  const { name, email, password, id } = req.body;

  if (!name || !email || !id) {
    return res
      .status(400)
      .json(Error.getError("Name, email and id is required"));
  }

  if (initialUsers.find("name", name)) {
    return res.status(400).json(Error.getError("Username already exists"));
  } else if (initialUsers.find("email", email)) {
    return res.status(400).json(Error.getError("Email already exists"));
  } else if (initialUsers.find("id", email)) {
    return res.status(400).json(Error.getError("Email already exists"));
  }

  const newUser = new UserBuilder()
    .setEmail(email)
    .setPassword(password)
    .setName(name)
    .setId(id)
    .build();

  initialUsers.add(newUser);

  res.send(newUser);
};

export const getUsers = (req: Request, res: Response) => {
  // #swagger.tags = ['User']
  return res.json(initialUsers.getResponse);
};

export const deleteUserById = (req: Request, res: Response) => {
  // #swagger.tags = ['User']
  const id = req.params.id;

  if (!id) {
    return res.send(Error.getError("No user found"));
  }

  let response: HttpResponse<User | undefined> = {
    data: undefined,
    length: 0,
  };

  let foundItem = initialUsers.find("id", id);

  if (foundItem) {
    response = {
      data: foundItem,
      length: 1,
    };

    initialUsers.filter("id", id);
  }
  res.status(foundItem ? 200 : 404).send(response);
};
