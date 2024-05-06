import { db } from "@db/db";
import { Diet } from "../models/diet.model";

export const getAllDiets = (): Promise<Diet[]> => {
  return db.all("SELECT * FROM diets");
};
