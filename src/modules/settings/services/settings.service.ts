import { db } from "@db/db";
import { UserSettings } from "../models/settings.interface";

export const getSettingsFromDb = async (): Promise<UserSettings> => {
  return await db.all(`SELECT * FROM settings`);
};

export const updateSettingsInDb = async (
  settings: UserSettings
): Promise<void> => {
  await db.run(`UPDATE settings SET ?`, settings);
};

export const deleteSettingsFromDb = async (): Promise<void> => {
  await db.run(`DELETE FROM settings`);
};

export const insertSettingsToDb = async (
  settings: UserSettings
): Promise<void> => {
  await db.run(`INSERT INTO settings SET ?`, settings);
};
