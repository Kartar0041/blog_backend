import express from "express";
import { registerUser } from "../controllers/auth.controller";


const authRouter = express.Router();


// Create User Routes
authRouter.post('/', registerUser);

export default authRouter;