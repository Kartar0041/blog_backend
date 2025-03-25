import { NextFunction, Request, Response } from "express";
import { sendResponse } from "../utils/utils.response";
import { ERROR_MESSAGES, HTTP_STATUS } from "../constants";

// Global Error
export const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = err.statusCode || HTTP_STATUS.INTERNAL_SERVER_ERROR;
  const message = err.message || ERROR_MESSAGES.INTERNAL_SERVER_ERROR;

  sendResponse(res, {
    success: false,
    message,
    error: err.stack,
    statusCode,
  });
};
