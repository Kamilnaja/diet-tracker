import { HttpResponse } from "@shared/models/http-response.model";
import { RESPONSE_CODES } from "@shared/models/response-codes.const";
import { Request, Response } from "express";
import { db } from "../../../db";
import { Tag } from "../models/tag.interface";

export const getTagsDict = (req: Request, res: Response) => {
  // #swagger.tags = ['Tags']
  // #swagger.description = 'Get all Tags'
  // #swagger.responses[200] = {
  //   description: 'Tags successfully obtained',
  //   schema: { $ref: '#/definitions/TagsResponse'}
  // }

  db.all("SELECT * FROM tags", (err: any, rows: any) => {
    if (err) {
      res.status(RESPONSE_CODES.NOT_FOUND).json(err.message);
    }
    let response: HttpResponse<Tag> = {
      data: rows,
      length: rows.length,
    };
    res.status(RESPONSE_CODES.OK).json(response);
  });
};
