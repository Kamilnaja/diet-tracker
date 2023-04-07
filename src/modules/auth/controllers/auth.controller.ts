import { Error } from "@models/error";
import { HttpResponse } from "@shared/models/http-response.model";
import { RESPONSE_CODES } from "@shared/models/response-codes.const";
import { store } from "@shared/store";
import { Request, Response } from "express";
import { AuthBuilder } from "../builders/auth.builder";
import { User } from "../models/user.interface";

export const signup = (req: Request, res: Response) => {
  /* #swagger.tags = ['Auth']
   #swagger.description = 'Create new user'
   #swagger.parameters['newUser'] = {
     in: 'body',
     description: 'New User object',
     required: true,
     type: 'object',
     schema: { $ref: '#/definitions/User' }
    }
    #swagger.responses[200] = {
      description: 'User successfully created',
      schema: { $ref: '#/definitions/User' }
    }
    #swagger.responses[409] = {
      description: 'User with this email already exists',
      schema: { $ref: '#/definitions/ErrorConflict' }
    }
  */

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
