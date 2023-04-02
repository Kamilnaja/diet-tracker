import { Request, Response } from "express";
import { getInitialUsers } from "../helpers/create-users";

const initialUsers = getInitialUsers();

export const checkDuplicateUsernameOrEmail = async (
  req: Request,
  res: Response,
  next: () => void
) => {
  try {
    let userByName = initialUsers.find("name", req.body.name);

    if (userByName) {
      res.status(400).send({ message: "Failed! Username is already in use!" });
      return;
    }

    let email = initialUsers.find("email", req.body.email);

    if (email) {
      res.status(400).send({ message: "Failed! Email is already in use!" });
      return;
    }

    next();
  } catch (error) {
    res.status(500).send({ message: "Unable to validate user" });
  }
};
