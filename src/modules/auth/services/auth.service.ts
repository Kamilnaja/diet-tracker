import { db } from "@db/db";
import { User } from "../models/user.interface";

// add some service code
export class AuthService {
  static addUserToDb = async (user: User): Promise<void> => {
    const query = `INSERT INTO users (userName, email, password) VALUES (?, ?, ?)`;
    await db.run(query, [user.userName, user.email, user.password]);
  };
}
