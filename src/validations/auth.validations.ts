import Joi from "joi";
import { COMMAN_REGEX, USER_ROLES } from "../constants";

export const registerSchema = Joi.object({
  name: Joi.string().alphanum().min(3).max(30).required().messages({
    "string.base": "Username must be a text.",
    "string.empty": "Username cannot be empty.",
    "string.min": "Username should be at least 3 characters long.",
    "string.max": "Username should not exceed 30 characters.",
    "any.required": "Username is required.",
  }),
  password: Joi.string()
    .pattern(new RegExp(COMMAN_REGEX.PASSWORD_REGEX))
    .messages({
      "string.min": "Password should be at least {#limit} characters long.",
      "any.required": "Password is required.",
    }),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    })
    .messages({
      "string.email": "Please enter a valid email address.",
      "any.required": "Email is required.",
    }),
  role: Joi.string()
    .valid(USER_ROLES.ADMIN, USER_ROLES.AUTHOR, USER_ROLES.READER)
    .required()
    .messages({
      "any.required": "Role is required",
    }),
});

export const loginSchema = Joi.object({
  password: Joi.string()
    .messages({
      "any.required": "Password is required.",
    }),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    })
    .messages({
      "string.email": "Please enter a valid email address.",
      "any.required": "Email is required.",
    }),
});
