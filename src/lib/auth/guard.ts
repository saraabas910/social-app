import jwt, {JwtPayload} from "jsonwebtoken";
import { env } from "../config/env.js";
import type { Request, Response, NextFunction } from 'express';
import { AppError } from "../error/error.js";


export function guard(req:Request, res:Response, next:NextFunction) {

   try {
     const token = req.cookies.access_token ;
    if (!token) {
        return res.status(403).json({ message: 'Unauthorized' });
    }
   req.user = jwt.verify(token,env.jwt.secret)as JwtPayload
   
    
    next();

 }catch (error: unknown) {
    next(new AppError("Invalid or expired token", 401));
   }
}