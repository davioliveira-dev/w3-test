import { NextFunction, Request, Response } from "express";
export declare const errorToExpressResponse: (error: Error, request: Request, response: Response, next: NextFunction) => Response<any, Record<string, any>>;
