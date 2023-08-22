import { Entry } from "@shared/models/entry.model";

export interface User extends Entry {
  email: string;
  password?: string;
  userName: string;
}
