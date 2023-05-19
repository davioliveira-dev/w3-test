import { NextFunction, Request, Response } from "express";

export const errorToExpressResponse = (
  error: Error,
  request: Request,
  response: Response,
  next: NextFunction
) => {
  if (error instanceof Error) {
    return response.status(400).json({ message: error.message });
  }
  return response.status(500).json({ message: "Internal Server Error" });
};
