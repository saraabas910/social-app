import {Schema, model} from 'mongoose';

export enum Provider {
    facebook = 2,
    google = 1,
    local= 0,

}

export enum Gender {
    male = 1,
    female = 0,
}

export interface IUser {
    UserName: string;
    email: string;
    password?: string;
    provider: Provider;
    gender?: Gender;
    isVerified: boolean;
    bio?: string;
    profilePicture?: string;
    isPrivate?: boolean;
}
const schema  =new Schema<IUser>({
    UserName:{
        type: String,
        required: true,
        trim: true,
        minlength : 3,
        maxlength : 20,
    },
    email:{
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },

      password :{
        required :function(this: any) {
            return this.provider === Provider.local;
        },
        type : String,
        trim : true,
            
      },  isVerified: {
        type: Boolean,
        default: false
    },
      provider :{
        type : Number,
        default : Provider.local,
        enum : Provider
      },
      gender :{
        type : Number,
    
        enum : Gender
      },
      bio: {
    type: String,
    trim: true,
    maxlength: 300
},
profilePicture: {
    type: String
},
isPrivate: {
    type: Boolean,
    default: false
}


})

export const User = model<IUser>('User', schema);