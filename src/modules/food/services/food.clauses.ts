export const joinClause = `SELECT f.*, GROUP_CONCAT(t.id) AS tags
  FROM food f
  LEFT JOIN food_tags ft ON f.id = ft.food_id
  LEFT JOIN tags t ON ft.tag_id = t.id`;

export const limitClause = (limit?: number): string =>
  `${limit ? `LIMIT ${limit}` : ""}`;

export const offsetClause = (limit?: number, page?: number): string => {
  if (page && page < 1) {
    page = 1;
  }
  return `${page && limit ? `OFFSET ${(page - 1) * limit}` : ""}`;
};
