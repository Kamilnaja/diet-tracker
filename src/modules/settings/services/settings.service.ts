import { db } from "@db/db";
import { tables } from "@db/db-table-names";
import { UserSettings } from "../models/settings.interface";

export const getSettingsFromDb = async (): Promise<UserSettings[]> => {
  // returns just one row, for testing purposes
  return await db.all(`SELECT * FROM ${tables.SETTINGS} LIMIT 1`);
};

export const updateSettingsInDb = async (
  settings: UserSettings
): Promise<void> => {
  const { height, age, gender, theme, email } = settings;
  await db.run(
    `UPDATE ${tables.SETTINGS} SET height = ?, age = ?, gender = ?, theme = ?, email = ?`,
    [height, age, gender, theme, email]
  );
};
