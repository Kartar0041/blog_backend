// Body validator
import { Response, Request, NextFunction } from "express";
import { ERROR_MESSAGES, HTTP_STATUS } from "../constants";
import { sendResponse } from "../utils/utils.response";
import { Schema } from "joi";

const validateBody = (schema: Schema) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const { error } = schema.validate(req.body, { abortEarly: false });

    const errors = error?.details.map((err) => ({
      field: err.path.join("."),
      message: err.message,
    }));

    if (errors) {
      sendResponse(res, {
        success: false,
        message: ERROR_MESSAGES.SOMETHING_WENT_WRONG,
        statusCode: HTTP_STATUS.BAD_REQUEST,
        error: errors || null,
      });
      return;
    }

    next(); // Proceed if no validation errors
  };
};

export default validateBody;
