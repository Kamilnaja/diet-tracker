export const joinClause = `SELECT f.*, GROUP_CONCAT(t.id) AS tags
  FROM food f
  LEFT JOIN food_tags ft ON f.id = ft.food_id
  LEFT JOIN tags t ON ft.tag_id = t.id`;

export const limitClause = (limit?: number): string =>
  `${limit ? `LIMIT ${limit}` : ""}`;
