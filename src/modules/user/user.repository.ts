import { HydratedDocument } from "mongoose";
import {AbstractRepository} from "../../lib/database/abstract.repository.js";
import type { IUser } from "../../lib/database/user.model.js";
import { User } from "../../lib/database/user.model.js";


export class UserRepository extends AbstractRepository<IUser> {

    constructor(){
          super(User);
    }

    async findByEmail(email:string):Promise<HydratedDocument<IUser>|null>{
       return User.findOne({email:email})
    }
  async findById(id: string) {
    return User.findById(id);
}
async findByIdWithoutPassword(id: string) {
    return User.findById(id).select('-password');
}
async searchUsers(search: string) {
    return User.find({
        UserName: search
    }).select('-password');
}
}

export const userRepository = new UserRepository();


