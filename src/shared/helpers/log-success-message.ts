import { getRandomEmoji } from "./random-emoji";

export const logSuccessMessage = (table: string): void => {
  console.log(`${getRandomEmoji()} ${table} success`);
};
