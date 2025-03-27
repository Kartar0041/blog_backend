import express from "express";
import { loginUser, registerUser } from "../controllers/auth.controller";
import validateBody from "../middlewares/middleware.validation";
import { registerSchema, loginSchema } from "../validations/auth.validations";

const authRouter = express.Router();

// Create User Routes
authRouter.post("/", validateBody(registerSchema), registerUser);
authRouter.post("/login", validateBody(loginSchema), loginUser);

export default authRouter;
