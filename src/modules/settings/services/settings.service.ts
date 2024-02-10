import { db } from "@db/db";
import { Settings } from "../models/settings.interface";

export class SettingsService {
  static getSettings = async (): Promise<Settings> => {
    return await db.all(`SELECT * FROM settings`);
  };
}
