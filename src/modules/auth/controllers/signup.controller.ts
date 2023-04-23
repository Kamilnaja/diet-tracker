import { RESPONSE_CODES } from "@shared/models/response-codes.const";
import { Request, Response } from "express";
import { AuthBuilder } from "../builders/auth.builder";

export const signup = async (req: Request, res: Response): Promise<void> => {
  /* 
  #swagger.deprecated = true
  #swagger.tags = ['Auth']
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

  res.status(RESPONSE_CODES.CREATED).json(newUser);
};
