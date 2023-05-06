import { authSecret } from "@shared/config/auth.config";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export const verifyToken = (
  req: Request & { userId: string },
  res: Response,
  next: NextFunction
): void => {
  const token = req?.session?.token;

  if (!token) {
    res.status(403).send({
      message: "No token provided!",
    });
    return;
  }

  jwt.verify(token, authSecret, (err: any, decoded: any) => {
    if (err) {
      res.status(401).send({
        message: "Unauthorized!",
      });
      return;
    }
    req.userId = decoded.id;
    next();
  });
};
