export interface UserSettings {
  user_id: string;
  height: number;
  age: number;
  gender: Gender;
  cookieAccepted: boolean;
  theme: Theme;
}

type Theme = "light" | "dark";
type Gender = "female" | "male";
