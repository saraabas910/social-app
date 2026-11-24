import { JwtPayload } from "jsonwebtoken";
import { IUser } from "../database/user.model.js";

declare module 'express-serve-static-core'{
    interface Request{
          user?:Partial<IUser>& JwtPayload;
    }
}