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

export const getDietBydId: ControllerReq = async (
  req: Request,
  res: Response
) => {
  /*
    #swagger.tags = ['Diet']
    #swagger.description = 'Get diet by ID'
    #swagger.parameters['id'] = {
      in: 'path',
      description: 'Diet ID',
      required: true,
    }
    #swagger.responses[200] = {
      description: 'Diet successfully obtained',
      schema: { $ref: '#/definitions/Diet' }
    }
    #swagger.responses[404] = {
      description: 'Diet not found',
      schema: { $ref: '#/definitions/Error' }
    }
  */
  res.send("Diet by ID");
};
