export const getRandomEmoji = (): string => {
  const emojis = [
    "🚚",
    "🐘",
    "🐍",
    "🔥",
    "🌵",
    "💰",
    "🧪",
    "💣",
    "🫐",
    "🫒",
    "🫑",
    "🫘",
    "🫓",
    "🫔",
    "🫕",
  ];
  const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
  return randomEmoji || "🚚";
};
