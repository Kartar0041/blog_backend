import { Request, Response } from "express";
import User from "../models/Users";
import { HTTP_STATUS } from "../constants";
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from "../constants";
import { ApiError, sendResponse } from "../utils/utils.response";

// Register User
const registerUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password, role } = req.body;

    // Check existing user (later we apply bloom filters here)
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return sendResponse(res, {
        statusCode: HTTP_STATUS.ALREADY_EXIST,
        success: true,
        message: ERROR_MESSAGES.USER_EXISTS,
        data: null,
      });
    }
    const user = new User({ name, email, password, role });
    await user.save();
    return sendResponse(res, {
      statusCode: HTTP_STATUS.CREATED,
      success: true,
      message: SUCCESS_MESSAGES.USER_REGISTERED,
      data: null,
    });
  } catch (error) {
    throw error;
  }
};

export { registerUser };
