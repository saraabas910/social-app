import { Router } from "express";
import AuthController from "./controller/auth.controller.js";

const authRouter = Router();

authRouter.post('/register', AuthController.register);
authRouter.post('/verify-account', AuthController.verifyAccount);
authRouter.post('/login', AuthController.login);
authRouter.post('/resend-otp', AuthController.resendOTP);
authRouter.post('/change-password', AuthController.changePassword);
export default authRouter;