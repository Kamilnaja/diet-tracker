import { Error } from "@models/error";
import { RESPONSE_CODES } from "@shared/models/response-codes.const";
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
    // todo - use db to check if user exists
    next();
  } catch (error) {
    res
      .status(RESPONSE_CODES.INTERNAL_SERVER_ERROR)
      .send({ message: "Unable to validate user" });
  }
};
