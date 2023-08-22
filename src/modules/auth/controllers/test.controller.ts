import { Request, Response } from "express";

export const userBoard = async (req: Request, res: Response): Promise<void> => {
  /*
  #swagger.tags = ['Test']
  */
  res.status(200).json({ message: "User Content." });
};
