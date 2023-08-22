import { authSecret } from "@shared/config/auth.config";
import { RESPONSE_CODES } from "@shared/models/response-codes.const";
import { NextFunction, Request, Response } from "express";
import jwt, { VerifyErrors } from "jsonwebtoken";

export const verifyToken = (
  req: Request<CustomParams>,
  res: Response,
  next: NextFunction
): void => {
  const token = req?.session?.token;

  if (!token) {
    res.status(RESPONSE_CODES.FORBIDDEN).send({
      message: "No token provided!",
    });
    return;
  }

  jwt.verify(token, authSecret, (err: VerifyErrors | null, decoded: any) => {
    if (err) {
      res.status(RESPONSE_CODES.UNAUTHORIZED).send({
        message: "Unauthorized!",
      });
      return;
    }
    req.params.userId = decoded;
    next();
  });
};

export interface CustomParams {
  userId: string;
}
