import express from "express";
import authRouter from "./auth.routes";


const router = express.Router();

router.use('/user', authRouter);

export default router;