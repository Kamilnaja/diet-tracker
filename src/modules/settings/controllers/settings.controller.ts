import { RESPONSE_CODES } from "@shared/models/response-codes.const";
import { NextFunction, Request, Response } from "express";
import {
  getSettingsFromDb,
  updateSettingsInDb,
} from "../services/settings.service";

export const getSettings = async (
  _: Request,
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
    const settings = await getSettingsFromDb();
    res.status(RESPONSE_CODES.OK).json(settings[0]);
  } catch (err) {
    next(err);
  }
};

export const editSettings = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  /*
  #swagger.tags = ['Settings']
  #swagger.description = 'Edit settings'
  #swagger.parameters['settings'] = {
    in: 'body',
    description: 'Settings object',
    required: true,
    schema: { $ref: '#/definitions/Settings' }
  }
  #swagger.responses[204] = {
    description: 'Success when editing settings'
  }
  */
  try {
    const settings = req.body;
    if (settings) {
      await updateSettingsInDb(settings);
      res.status(RESPONSE_CODES.NO_CONTENT).json();
    }
  } catch (err) {
    next(err);
  }
};
