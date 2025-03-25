import { Response, NextFunction, Request } from "express";

interface IApiResponse<T> {
    success: boolean;
    message?: string;
    data?: T;
    error?: any;
    statusCode: number;
}


export const sendResponse = <T>(res: Response, payload: IApiResponse<T>) : void => {
  const { success, message, data, error, statusCode } = payload;

  res.status(statusCode).json({
    success,
    message,
    data: data || null,
    error: error || null
  })
}


// Api Error
export class ApiError extends Error {
  statusCode: number;

  constructor(statusCode: number, message: string) {
    super(message);
    this.statusCode = statusCode;
    Error.captureStackTrace(this, this.constructor);
  }
}