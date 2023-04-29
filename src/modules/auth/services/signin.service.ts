import { db } from "@db/db";
import { tables } from "@db/db-table-names";
import { assertNonNullish } from "@shared/helpers/assert-non-nullish";
import bcrypt from "bcrypt";
import { User } from "../models/user.interface";

export const signinUser = async (user: User): Promise<User> => {
  const { userName, password } = user;

  const query = `SELECT password FROM ${tables.USERS} WHERE username = ?`;
  const row = await db.get(query, [userName]);

  if (!row) {
    throw new Error("User not found");
  }

  assertNonNullish(password, "Password is required");
  const passwordIsValid = await bcrypt.compare(password, row.password);

  if (!passwordIsValid) {
    throw new Error("Password is incorrect");
  }

  return row;
};
