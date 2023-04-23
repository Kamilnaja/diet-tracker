import { NextFunction, Request, Response } from "express";

export const shouldLoadInitialData = (): boolean => {
  return process.argv.at(-1)?.split("=").at(-1) === "true";
};

export const use =
  (fn: any) => (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };

export const baseURL = "http://localhost:8081/api";
