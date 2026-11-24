import {AbstractRepository} from "../../../lib/database/abstract.repository.js";
import type { IUser } from "../../../lib/database/user.model.js";
import { User } from "../../../lib/database/user.model.js";


export class AuthRepository extends AbstractRepository<IUser> {

    constructor(){
          super(User);
    }
  


}

export default new AuthRepository();

