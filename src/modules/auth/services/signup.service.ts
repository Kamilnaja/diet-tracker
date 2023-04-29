import { db } from "@db/db";
import { assertNonNullish } from "@shared/helpers/assert-non-nullish";
import bcrypt from "bcrypt";
import { User } from "../models/user.interface";

export const signupUser = async (user: User): Promise<void> => {
  const { userName, email, password } = user;

  assertNonNullish(password, "Password is required");

  const hashedPasword = await bcrypt.hash(password, 8);
  const query = `INSERT INTO users (username, email, password) VALUES (?, ?, ?)`;
  try {
    await db.run(query, [userName, email, hashedPasword]);
  } catch (err) {
    console.log("Error when inserting user");
    console.log(err);
  }
};
export const deleteUserById = async (id: string): Promise<void> => {
  /*
  #swagger.tags = ['Auth']
  */
  try {
    const query = `DELETE FROM users WHERE id = ?`;
    await db.run(query, [id]);
  } catch (err) {
    console.log("Error when deleting user");
    console.log(err);
  }
};
