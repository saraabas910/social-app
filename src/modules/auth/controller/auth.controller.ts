import type { Request, Response, NextFunction } from 'express';
import authService,{AuthService} from "../service/auth.service.js"
import { loginDto, SendOtpDto, VerifyAccount } from '../dto/dto.js';


class AuthController {
    private authService: AuthService = authService;

    register = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const user = await this.authService.register(req.body);

            return res.status(201).json({
                message: 'user created successfully',
                success: true,
                data: user
            });

        } catch (error) {
            next(error);
        }
    };

    verifyAccount = async (req: Request, res: Response, next: NextFunction) => {
        try {
            await this.authService.verifyAccount(req.body as VerifyAccount);

            return res.status(200).json({
                message: 'Account verified successfully',
                success: true
            });

        } catch (error) {
            next(error);
        }
    };

    login = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const result = await this.authService.login(req.body as loginDto);

            return res.status(200).json({
                message: 'Login successful',
                success: true,
                data: result
            });

        } catch (error) {
            next(error);
        }
    };

resendOTP = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await this.authService.resendOTP(req.body as SendOtpDto);

        return res.status(200).json({
            message: 'OTP sent successfully',
            success: true
        });

    } catch (error) {
        next(error);
    }
};

changePassword = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, newPassword, code } = req.body;

        const result = await this.authService.changePassword(
            email,
            newPassword,
            code
        );

        return res.status(200).json({
            message: 'Password changed successfully',
            success: true,
            data: result
        });

    } catch (error) {
        next(error);
    }
};

}

export default new AuthController();

