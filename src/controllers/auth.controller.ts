import { Request, Response } from "express";
import User from "../models/Users";
import { HTTP_STATUS } from "../constants";
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from "../constants";
import { sendResponse } from "../utils/utils.response";
import { generateToken } from "../services/auth.services";

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

// Login User
const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    console.log("User");

    // Check existing user (later we apply bloom filters here)
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return sendResponse(res, {
        statusCode: HTTP_STATUS.NOT_FOUND,
        success: false,
        message: ERROR_MESSAGES.USER_NOT_FOUND,
        data: null,
      });
    }

    const isValidPassword = await existingUser.comparePassword(password);
    if (isValidPassword) {
      // create jwt token here
      const authToken = generateToken({
        email: existingUser.email,
        _id: existingUser._id,
      });
      return sendResponse(res, {
        statusCode: HTTP_STATUS.CREATED,
        success: true,
        message: SUCCESS_MESSAGES.USER_REGISTERED,
        data: authToken,
      });
    } else {
      return sendResponse(res, {
        statusCode: HTTP_STATUS.BAD_REQUEST,
        success: false,
        message: ERROR_MESSAGES.INCORRECT_PASSWORD,
        data: null,
      });
    }
  } catch (error) {
    throw error;
  }
};

export { registerUser, loginUser };
