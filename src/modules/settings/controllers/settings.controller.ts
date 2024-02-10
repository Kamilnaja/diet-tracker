import { RESPONSE_CODES } from "@shared/models/response-codes.const";
import { NextFunction, Request, Response } from "express";
import { SettingsService } from "../services/settings.service";

export const getSettings = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  /*
  #swagger.tags = ['Settings']
  #swagger.description = 'Get settings'
  #swagger.responses[200] = {
    description: 'Success when getting settings',
    schema: { $ref: '#/definitions/Settings' }
  }
  */
  try {
    const settings = await SettingsService.getSettings();
    res.status(RESPONSE_CODES.OK).json(settings);
  } catch (err) {
    next(err);
  }
};
