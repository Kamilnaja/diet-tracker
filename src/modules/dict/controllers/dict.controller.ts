import { db } from "@db/db";
import { Request, Response } from "express";

export const getTagsDict = async (_: Request, res: Response): Promise<void> => {
  /* #swagger.tags = ['Tags']
    #swagger.description = 'Get all Tags'
    #swagger.responses[200] = {
      description: 'Tags successfully obtained',
      schema: { $ref: '#/definitions/TagsResponse'}
  }
  */

  const tags = await db.all("SELECT id, tag_name name FROM tags");
  res.status(200).json({ data: tags, length: tags.length });
};
