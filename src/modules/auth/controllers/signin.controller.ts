import { RESPONSE_CODES } from "@shared/models/response-codes.const";
import { NextFunction, Request, Response } from "express";
import { UserBuilder } from "../builders/user.builder";
import { signinUser } from "../services/signin.service";

export const signin = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  /*
  #swagger.tags = ['Auth']
  #swagger.description = 'Sign in user'
  #swagger.parameters['user'] = {
    in: 'body',
    description: 'User object',
    required: true,
    type: 'object',
    schema: { $ref: '#/definitions/SignInUser' }
  }
  */
  const { userName, password } = req.body;
  const user = new UserBuilder()
    .setUserName(userName)
    .setPassword(password)
    .build();

  try {
    await signinUser(user);
    res
      .status(RESPONSE_CODES.OK)
      .send({ message: "User was signed in successfully!" });
    return;
  } catch (err) {
    next(err);
  }
};
