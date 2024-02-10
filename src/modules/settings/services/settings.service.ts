import { db } from "@db/db";
import { UserSettings } from "../models/settings.interface";

export class SettingsService {
  static getSettings = async (): Promise<UserSettings> => {
    return await db.all(`SELECT * FROM settings`);
  };
}
