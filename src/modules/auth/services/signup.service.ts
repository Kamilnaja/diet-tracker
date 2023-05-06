import { db } from "@db/db";
import { tables } from "@db/db-table-names";
import { assertNonNullish } from "@shared/helpers/assert-non-nullish";
import bcrypt from "bcrypt";
import { SQL } from "sql-template-strings";
import { User } from "../models/user.interface";

export const signupUser = async (user: User): Promise<void> => {
  const { userName, email, password } = user;

  assertNonNullish(password, "Password is required");

  const hashedPasword = await bcrypt.hash(password, 8);

  try {
    await db.all(
      SQL`INSERT INTO users (username, email, password) VALUES (${userName}, ${email}, ${hashedPasword})`
    );
  } catch (err) {
    console.log("Error when inserting user");
    throw new Error(err as any);
  }
};

export const deleteUserById = async (id: string): Promise<void> => {
  try {
    await db.run(`DELETE FROM ${tables.USERS} WHERE id = ?`, [id]);
  } catch (err) {
    console.log("Error when deleting user 1");
    console.log(err);
  }
};

export const deleteAllUsers = async (): Promise<void> => {
  try {
    const query = `DELETE FROM ${tables.USERS}`;
    await db.run(query);
  } catch (err) {
    console.log("Error when deleting all users");
    console.log(err);
  }
};
