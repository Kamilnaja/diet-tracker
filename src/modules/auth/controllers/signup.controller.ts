import { NextFunction, Request, Response } from "express";
import { AuthBuilder } from "../builders/auth.builder";
import { AuthService } from "../services/auth.service";

export const signup = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  /* 
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
    .build();

  try {
    AuthService.addUserToDb(newUser);
    res.status(201).send(newUser);
    return;
  } catch (err) {
    next(err);
  }
};

export const signin = async (req: Request, res: Response): Promise<void> => {
  /*
  #swagger.tags = ['Auth']
  */
  res.status(200).send({ message: "User was signed in successfully!" });
};

export const signout = async (req: Request, res: Response): Promise<void> => {
  /*
  #swagger.tags = ['Auth']
  */
  res.status(200).send({ message: "User was signed out successfully!" });
};
