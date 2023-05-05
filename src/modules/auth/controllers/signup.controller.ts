import { assertNonNullish } from "@shared/helpers/assert-non-nullish";
import { RESPONSE_CODES } from "@shared/models/response-codes.const";
import { NextFunction, Request, Response } from "express";
import { UserBuilder } from "../builders/user.builder";
import { deleteUserById, signupUser } from "../services/signup.service";

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

  const newUser = new UserBuilder()
    .setEmail(email)
    .setPassword(password)
    .setUserName(userName)
    .build();

  try {
    signupUser(newUser);
    res.status(RESPONSE_CODES.CREATED).send(newUser);
    return;
  } catch (err) {
    next(err);
  }
};

export const deleteById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  /*
  #swagger.tags = ['Auth']
  #swagger.deprecated = true
  #swagger.description = 'Delete user by id - only for testing purposes'
  #swagger.parameters['id'] = {
    in: 'path',
    description: 'User id',
    required: true,
    type: 'string'
  }
  */
  const { id } = req.params;
  assertNonNullish(id, "id");
  try {
    await deleteUserById(id);
    res.send(200);
  } catch (err) {
    next(err);
  }
};

export const signout = async (req: Request, res: Response): Promise<void> => {
  /*
  #swagger.tags = ['Auth']
  */
  res.status(200).send({ message: "User was signed out successfully!" });
};
