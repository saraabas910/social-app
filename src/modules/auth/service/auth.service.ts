import { userRepository, UserRepository } from '../../user/user.repository.js';
import type { loginDto, registerDto, SendOtpDto } from '../dto/dto.js';
import type { VerifyAccount } from '../dto/dto.js';
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import { mailjetProvider } from '../../../lib/email/init.js';
import { cacheProvider } from '../../../lib/cache/init.js';
import { verifyToken } from '../../../lib/utils/google-auth.js';
import authRepository from '../repository/auth.repository.js';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { env } from '../../../lib/config/env.js'
import { IUser, Provider } from '../../../lib/database/user.model.js';

export class AuthService {
  private readonly userRepository:UserRepository = userRepository;
  private readonly mailProvider = mailjetProvider;
  private readonly cacheProvider = cacheProvider;
private readonly sendOtpKey = 'auth:otp:';
 register = async (RegisterDto: registerDto) => {
    const user = await this.userRepository.findByEmail(RegisterDto.email);

    if (user) {
        throw new Error('User already exists');
    }

    RegisterDto.password = await bcrypt.hash(RegisterDto.password, 10);

    const createdUser = await this.userRepository.create(RegisterDto);

    const otp = crypto.randomInt(100000, 1000000).toString();

    await this.cacheProvider.set(
        `${this.sendOtpKey}${createdUser._id.toString()}`,
        otp,
        300
    );

    await this.mailProvider.sendEmail(
        RegisterDto.email,
        'Verify your email',
        `<p>Your OTP is: ${otp}</p>`
    );

    return createdUser;
};




   verifyAccount= async(verifyAccDto:VerifyAccount)=> {
  const user = await userRepository.findByEmail(verifyAccDto.email);
  if (!user) {
    throw new Error('User not found');
  }
  if (user.isVerified) {
    throw new Error('User is already verified');
  }
  
  const cacheCode = await this.cacheProvider.get(
      `${this.sendOtpKey}${user._id.toString()}`
    );
   if (!cacheCode) {
    throw new Error('OTP expired, please request a new one');
   }
  if (cacheCode !== verifyAccDto.code) {
    throw new Error('Invalid OTP');
  }
   const updatedUser = await this.userRepository.update({email:verifyAccDto.email}, {isVerified:true});

      await this.cacheProvider.del(
      `${this.sendOtpKey}${user._id.toString()}`
    );
        return updatedUser;


}

login = async (logInDto: loginDto) => {

    const user = await this.userRepository.findByEmail(logInDto.email);

    if (!user) {
        throw new Error('Invalid email or password');
    }

    if (!user.isVerified) {
        throw new Error('Account not verified.Please verify your account before logging in.');
    }

    if (!user.password) {
        throw new Error('Invalid email or password');
    }

    const isMatch = await bcrypt.compare(logInDto.password, user.password);

    if (!isMatch) {
        throw new Error('Invalid email or password');
    }

    const Token = jwt.sign(
        { id: user._id, email: user.email, name: user.UserName },
        env.jwt.secret,
        { expiresIn: '1h' }
    );

    const refreshTolken = jwt.sign(
        { id: user._id },
        env.jwt.refreshSecret,
        { expiresIn: '7d' }
    );

    return {
        Token,
        refreshTolken
    };
};

async resendOTP(sendOtpDto: SendOtpDto) {
    const user = await this.userRepository.findByEmail(sendOtpDto.email);

    if (!user) {
        throw new Error('User not found');
    }

    const code = crypto.randomInt(100000, 1000000).toString();

    await this.cacheProvider.set(
        `auth:password:otp:${user._id.toString()}`,
        code,
        300
    );

    await this.mailProvider.sendEmail(
        sendOtpDto.email,
        'Change Password',
        `<p>Your OTP is: ${code}</p>`
    );
}
async changePassword(email: string, newPassword: string, code: string) {

    const user = await this.userRepository.findByEmail(email);

    if (!user) {
        throw new Error('User not found');
    }

    const cacheCode = await this.cacheProvider.get(
        `auth:password:otp:${user._id.toString()}`
    );

    if (!cacheCode) {
        throw new Error('OTP expired, please request a new one');
    }

    if (cacheCode !== code) {
        throw new Error('Invalid OTP');
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    const updatedUser = await this.userRepository.update(
        { email: email },
        { password: hashedPassword }
    );

    await this.cacheProvider.del(
        `auth:password:otp:${user._id.toString()}`
    );

    return updatedUser;
}








LoginWithGoogle = async (idToken: string) => {
    const payload = await verifyToken(idToken);

    if (!payload) {
        throw new Error("no payload provided");
    }

    let user = await this.userRepository.findByEmail(payload.email as string);

    if (!user) {
        user = await this.userRepository.create({
            email: payload.email as string,
            UserName: (payload.name as string) || (payload.email as string),
            isVerified: true,
            provider: Provider.google
        });
    }

    const token = jwt.sign(
        { id: user._id, email: user.email, name: user.UserName },
        env.jwt.secret,
        { expiresIn: '1h' }
    );

    return token;
};



  /**
 * @param {*} token -> refreshToken
 * @returns
 */
async refreshTokenFn(token: string) {
  const payload: any = jwt.verify(token, env.jwt.refreshSecret)as Partial<IUser>& JwtPayload;

  const accessToken: string = jwt.sign(
    {
      sub: payload.sub,
      UserName: payload.UserName
    },
    env.jwt.secret,
    { expiresIn: '1h' }
  );

  const refreshToken: string = jwt.sign(
    {
      sub: payload.sub,
      UserName: payload.UserName
    },
    env.jwt.refreshSecret,
    { expiresIn: '7d' }
  );

  return {
    accessToken,
    refreshToken
  };
}
}


export default new AuthService();





