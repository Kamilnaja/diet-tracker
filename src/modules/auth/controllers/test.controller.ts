import { Request, Response } from "express";

export const user = async (req: Request, res: Response): Promise<void> => {
  /*
  #swagger.tags = ['Auth']
  */
  res.status(200).json({ message: "User Content." });
};
