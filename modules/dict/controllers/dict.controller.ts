import { Request, Response } from "express";

export const getTagsDict = (req: Request, res: Response) => {
  // #swagger.tags = ['Tags']
  let response = [
    { id: 1, name: "Gluten Free" },
    { id: 2, name: "Vege" },
    { id: 3, name: "Lactose Free" },
  ];
  res.json(response);
};
