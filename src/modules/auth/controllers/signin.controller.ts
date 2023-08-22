import { authSecret } from "@shared/config/auth.config";
import { assertNonNullish } from "@shared/helpers/assert-non-nullish";
import { RESPONSE_CODES } from "@shared/models/response-codes.const";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { UserBuilder } from "../builders/user.builder";
import { signinUser } from "../services/signin.service";

export const signin = async (req: Request, res: Response): Promise<void> => {
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
    const userFromDb = await signinUser(user);

    const tokenToAssign = jwt.sign({ id: userFromDb.id }, authSecret, {
      expiresIn: 86400, // 24 hours
    });

    const { session } = req;
    assertNonNullish(session, "Session is required");

    session.token = tokenToAssign;

    res
      .status(RESPONSE_CODES.OK)
      .send({ message: "User has signed in successfully!" });
    return;
  } catch (err: any) {
    res.status(RESPONSE_CODES.UNAUTHORIZED).send({
      message: err.message || "Some error occurred while signing in the user.",
    });
  }
};
