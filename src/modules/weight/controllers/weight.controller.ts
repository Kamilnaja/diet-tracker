import { RESPONSE_CODES } from "@shared/models/response-codes.const";
import { NextFunction, Request, Response } from "express";
import { WeightService } from "../services/weight.service";

export const getWeights = async (
  _: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  /* 
    #swagger.auto = false
    #swagger.tags = ['Weight']
    #swagger.description = 'Get all weights'
    #swagger.responses[200] = {
      description: 'Weights successfully retrieved',
      schema: { $ref: '#/definitions/WeightsResponse' }
    }
  */
  await WeightService.getWeights()
    .then((rows) => {
      res.status(200).json({
        data: rows,
        length: rows.length,
      });
    })
    .catch((err) => {
      next(err);
    });
};

export const addWeight = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  /* 
    #swagger.tags = ['Weight']
    #swagger.description = 'Add new weight'
    #swagger.parameters['newWeight'] = {
      in: 'body',
      description: 'New weight object',
      required: true,
      type: 'object',
      schema: { $ref: '#/definitions/WeightEntry' }
    }
    #swagger.responses[200] = {
      description: 'Weight successfully added',
      schema: { $ref: '#/definitions/WeightEntry' }
    }
  */
  await WeightService.addWeight(req.body)
    .then(() => {
      res.status(RESPONSE_CODES.CREATED).json({
        data: req.body,
      });
    })
    .catch((err) => {
      next(err);
    });
};

export const editWeight = async (
  req: Request,
  res: Response
): Promise<void> => {
  /* 
  #swagger.parameters['id'] = {
      in: 'path',
      description: 'Weight id',
      required: true,
      type: 'number'
    }
    #swagger.parameters['newWeight'] = {
      in: 'body',
      description: 'New weight object',
      required: true,
      type: 'object',
      schema: { $ref: '#/definitions/WeightEntry' }
  }
    #swagger.tags = ['Weight']
    #swagger.description = 'Update weight by ID'
    #swagger.responses[200] = {
      description: 'Weight successfully updated',
      schema: { $ref: '#/definitions/WeightEntry' }
    }
    #swagger.responses[404] = {
      description: 'No such item',
      schema: { $ref: '#/definitions/ErrorSearch' }
    }
  */
  const { id } = req.params;

  if (!id) {
    res.send("No id");
    return;
  }

  await WeightService.editWeight(id, req.body)
    .then(() => {
      res.status(RESPONSE_CODES.OK).json({
        data: req.body,
      });
    })
    .catch((err) => {
      res.status(RESPONSE_CODES.NOT_FOUND).json({
        error: err,
      });
    });
};

export const deleteWeight = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  /*
    #swagger.tags = ['Weight']
    #swagger.description = 'Delete weight by ID'
    #swagger.responses[200] = {
      description: 'Weight successfully deleted',
      schema: { $ref: '#/definitions/WeightEntry' }
    }
    #swagger.responses[404] = {
      description: 'No such item',
      schema: { $ref: '#/definitions/ErrorSearch' }
    }
    #swagger.parameters['id'] = {
      in: 'path',
      description: 'Weight id',
      required: true,
      type: 'number'
    }
  */
  const { id } = req.params;

  if (!id) {
    res.status(RESPONSE_CODES.NOT_FOUND).json(new Error("No id"));
    return;
  }
  await WeightService.deleteWeight(id)
    .then(() => {
      res.status(RESPONSE_CODES.OK).json({
        data: req.body,
      });
    })
    .catch((err) => {
      next(err);
    });
};
