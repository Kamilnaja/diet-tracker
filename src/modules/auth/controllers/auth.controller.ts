import { Error } from "@models/error";
import { HttpResponse } from "@shared/models/http-response.model";
import { RESPONSE_CODES } from "@shared/models/response-codes.const";
import { Request, Response } from "express";
import { AuthBuilder } from "../builders/auth.builder";
import { User } from "../models/user.interface";
import { store } from "@shared/store";

export const signup = (req: Request, res: Response) => {
  // #swagger.tags = ['Auth']
  const { userName, email, password } = req.body;

  const newUser = new AuthBuilder()
    .setEmail(email)
    .setPassword(password)
    .setUserName(userName)
    .setId()
    .build();

  store.initialUsers.add(newUser);

  res.send(newUser);
};

export const getUsers = (req: Request, res: Response) => {
  // #swagger.tags = ['Auth']
  return res.json(store.initialUsers.getResponse);
};

export const deleteUserById = (req: Request, res: Response) => {
  // #swagger.tags = ['Auth']
  const { id } = req.params;

  if (!id) {
    return res.send(Error.getError("No user found"));
  }

  let response: HttpResponse<User | undefined> = {
    data: undefined,
    length: 0,
  };

  let foundItem = store.initialUsers.find("id", id);

  if (foundItem) {
    response = {
      data: foundItem,
      length: 1,
    };

    store.initialUsers.filter("id", id);
  }
  res
    .status(foundItem ? RESPONSE_CODES.OK : RESPONSE_CODES.NOT_FOUND)
    .send(response);
};
