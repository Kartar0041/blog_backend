import Joi from "joi";
import { COMMAN_REGEX, USER_ROLES } from "../constants";

export const registerSchema = Joi.object({
  name: Joi.string().alphanum().min(3).max(30).required(),
  password: Joi.string().pattern(new RegExp(COMMAN_REGEX.PASSWORD_REGEX)),
  email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
  role: Joi.string().valid(Object.values(USER_ROLES)).required()
});
