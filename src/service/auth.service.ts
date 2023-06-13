import {UserRepository} from "../repositories/user.repository";
import bcrypt, {compare} from "bcrypt";
import {generateHash} from "../helpers/hashPassword";

const Repository = new UserRepository()
export class AuthService {
  async login (body: any) {
    const user = await Repository.getOne(body.login);
    if(!user){
      return false;
    }
    const hashPassword = await generateHash(body.password, bcrypt.genSaltSync(10));
    if(hashPassword !== user.hashPassword){
      return false;
    }
    return true;
  }
}