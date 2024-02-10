export interface Settings {
  user: UserSettings;
  theme: Theme;
}

export interface UserSettings {
  height: number;
  cookieAccepted: boolean;
}

type Theme = "light" | "dark";
