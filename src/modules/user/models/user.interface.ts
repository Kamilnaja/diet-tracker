import { Entry } from "@shared/models/entry.interface";

export interface User extends Entry {
  email: string;
  password?: string;
}
