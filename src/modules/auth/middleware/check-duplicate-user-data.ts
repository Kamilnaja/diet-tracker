import { db } from "@db/db";
import { USERS } from "@db/db-table-names";
import { Error } from "@models/error";
import { RESPONSE_CODES } from "@shared/models/response-codes.const";
import { NextFunction, Request, Response } from "express";

export const checkDuplicateUserData = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { userName: username, email } = req.body;

    if (!username || !email) {
      res
        .status(RESPONSE_CODES.CONFLICT)
        .json(Error.getError("Name, email and id are required"));
      return;
    }
    const existingUser = await db.get(
      `SELECT * FROM ${USERS} WHERE username = ? LIMIT 1`,
      [username]
    );

    if (existingUser) {
      res
        .status(RESPONSE_CODES.BAD_REQUEST)
        .json(Error.getError("Username already exists"));
      return;
    }

    const existingEmail = await db.get(
      `SELECT * FROM ${USERS} WHERE email = ? LIMIT 1`,
      [email]
    );

    if (existingEmail) {
      res
        .status(RESPONSE_CODES.BAD_REQUEST)
        .json(Error.getError("Email already exists"));
      return;
    }

    next();
  } catch (error) {
    res
      .status(RESPONSE_CODES.INTERNAL_SERVER_ERROR)
      .send({ message: "Unable to validate user" });
    return;
  }
};
