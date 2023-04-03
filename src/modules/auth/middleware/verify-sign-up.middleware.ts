import { Request, Response } from "express";
import { RESPONSE_CODES } from "@shared/models/response-codes.const";
import { Error } from "@models/error";
import { store } from "@shared/store";

export const checkDuplicateUsernameOrEmail = async (
  req: Request,
  res: Response,
  next: () => void
) => {
  try {
    const { userName, email } = req.body;

    if (!userName || !email) {
      return res
        .status(RESPONSE_CODES.UNPROCESSABLE_ENTITY)
        .json(Error.getError("Name, email and id are required"));
    }

    let userByName = store.initialUsers.find("userName", userName);
    if (userByName) {
      res.status(400).send({ message: "Failed! Username is already in use!" });
      return;
    }

    let userByEmail = store.initialUsers.find("email", email);
    if (userByEmail) {
      res.status(400).send({ message: "Failed! Email is already in use!" });
      return;
    }

    next();
  } catch (error) {
    res.status(500).send({ message: "Unable to validate user" });
  }
};
