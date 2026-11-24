import { Gender, Provider } from '../../../lib/database/user.model.js';

export interface registerDto {
    UserName: string;
    email: string;
    password: string;
    phoneNumber?: string;
    gender: Gender;
    provider: Provider;
    isVerified:boolean

}


export interface loginDto {
    email: string;
    password: string;
}
export interface SendOtpDto {
    email: string;
}
export interface VerifyAccount{
 email:string,
 code:string

}

export interface updateProfileDto {
    UserName?: string;
    bio?: string;
    profilePicture?: string;
}
