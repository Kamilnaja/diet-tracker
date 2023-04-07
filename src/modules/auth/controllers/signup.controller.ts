import { RESPONSE_CODES } from "@shared/models/response-codes.const";
import { store } from "@shared/store";
import { Request, Response } from "express";
import { AuthBuilder } from "../builders/auth.builder";

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
    #swagger.responses[201] = {
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

  console.log(newUser);

  res.status(RESPONSE_CODES.CREATED).json(newUser);
};
