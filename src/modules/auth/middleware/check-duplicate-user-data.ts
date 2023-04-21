import { Error } from "@models/error";
import { RESPONSE_CODES } from "@shared/models/response-codes.const";
import { store } from "@shared/store";
import { Request, Response } from "express";

export const checkDuplicateUserData = async (
  req: Request,
  res: Response,
  next: () => void
): Promise<void> => {
  try {
    const { userName, email } = req.body;

    if (!userName || !email) {
      res
        .status(RESPONSE_CODES.CONFLICT)
        .json(Error.getError("Name, email and id are required"));
      return;
    }

    const userByName = store.initialUsers.find("userName", userName);
    if (userByName) {
      res
        .status(RESPONSE_CODES.CONFLICT)
        .send({ message: "Failed! Username is already in use!" });
      return;
    }

    const userByEmail = store.initialUsers.find("email", email);
    if (userByEmail) {
      res
        .status(RESPONSE_CODES.CONFLICT)
        .send({ message: "Failed! Email is already in use!" });
      return;
    }

    next();
  } catch (error) {
    res
      .status(RESPONSE_CODES.INTERNAL_SERVER_ERROR)
      .send({ message: "Unable to validate user" });
  }
};
