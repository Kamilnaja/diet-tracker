/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Error } from "@models/error";
import { RESPONSE_CODES } from "@shared/models/response-codes.const";
import { Request, Response } from "express";
import { FluidBuilder } from "../builders/fluid.builder";
import { Fluid } from "../models/fluid.interface";

export const getFluids = (req: Request, res: Response) => {
  /* 
    #swagger.deprecated = true
    #swagger.tags = ['Fluids'] 
    #swagger.description = 'Get all Fluids'
    #swagger.responses[200] = {
      description: 'Fluids successfully obtained',
      schema: { $ref: '#/definitions/Fluid'}
    }
  */

  let searchBy = req.query?.name as string;
  searchBy = searchBy?.trim().toLocaleLowerCase();

  if (searchBy) {
    const filterFn = (item: Fluid) =>
      item.name?.toLocaleLowerCase().includes(searchBy);

    res.send({});
  }
};

export const getFluidById = (req: Request, res: Response) => {
  // #swagger.tags = ['Fluids']
  const { id } = req.params;

  if (!id) {
    return res.send(Error.getError("No entry found"));
  }
};

export const addNewFluid = (req: Request, res: Response) => {
  /* 
    #swagger.tags = ['Fluids']
    #swagger.description = 'Add new Fluid'
    #swagger.parameters['body'] = {
      in: 'body',
      description: 'Fluid Body',
      schema: {
        $name: "Orange",
        $capacity: 100,
        caloriesPer100g: 30,
        id: "39393993",
        icon: "☕"
      }
    }
    #swagger.responses[201] = {
      description: 'Fluid successfully added',
      schema: { $ref: '#/definitions/Fluid' }
  } 
  */
  const {
    name,
    capacity,
    caloriesPer100g,
    id = new Date().getTime().toString(),
  } = req.body;

  if (!name || !capacity) {
    return res
      .status(RESPONSE_CODES.UNPROCESSABLE_ENTITY)
      .json(Error.getError("Both name and capacity are required"));
  }

  const fluid = new FluidBuilder()
    .setId(id)
    .setCapacity(capacity)
    .setCaloriesPer100g(caloriesPer100g)
    .setName(name);

  res.status(RESPONSE_CODES.CREATED).json(fluid);
};

export const deleteFluidById = (req: Request, res: Response) => {
  // #swagger.tags = ['Fluids']
  const { id } = req.params;

  if (!id) {
    return res.send(Error.getError("No entry found"));
  }
};

export const editFluid = (req: Request, res: Response) => {
  /*
    #swagger.tags = ['Fluids']
    #swagger.parameters['body'] = {
      in: 'body',
      description: 'Fluid Body',
      schema: {
        $name: "Orange",
        $capacity: 100,
        caloriesPer100g: 30,
        id: "123",
        icons: "☕",
      }
    } 
    #swagger.responses[201] = {
      description: 'Fluid successfully edited',
      schema: { $ref: '#/definitions/Fluid' }
    }
  */
  const { id } = req.params;

  if (!id) {
    return res
      .status(RESPONSE_CODES.NOT_FOUND)
      .send(Error.getError("No entry found"));
  }

  const { body } = req;

  const itemToReplace: Fluid = {
    id: id,
    name: body.name,
    capacity: body.capacity,
    caloriesPer100g: body.caloriesPer100g,
    icon: body.icon,
  };

  return res.status(RESPONSE_CODES.CREATED).send(req.body);
};
