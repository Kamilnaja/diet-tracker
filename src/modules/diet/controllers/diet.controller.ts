import { ControllerReq } from "@shared/models/controler-req.model";
import { RESPONSE_CODES } from "@shared/models/response-codes.const";
import { Request, Response } from "express";
import { getAllDiets } from "../services/diet.service";

export const getDiets: ControllerReq = async (req: Request, res: Response) => {
  /*
    #swagger.tags = ['Diet']
    #swagger.description = 'Get all diets'
    #swagger.responses[200] = {
      description: 'Diets successfully obtained',
      schema: { $ref: '#/definitions/Diet[]' }
    }
  */
  const diets = await getAllDiets();

  res.status(RESPONSE_CODES.OK).send(diets);
};
