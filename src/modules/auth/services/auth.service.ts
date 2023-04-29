import { db } from "@db/db";
import { assertNonNullish } from "@shared/helpers/assert-non-nullish";
import bcrypt from "bcrypt";
import { User } from "../models/user.interface";
// add some service code
export class AuthService {
  static addUserToDb = async (user: User): Promise<void> => {
    const { userName, email, password } = user;

    assertNonNullish(password, "Password is required");

    const hashedPasword = await bcrypt.hash(password, 10);
    const query = `INSERT INTO users (userName, email, password) VALUES (?, ?, ?)`;
    await db.run(query, [userName, email, hashedPasword]);
  };
}
