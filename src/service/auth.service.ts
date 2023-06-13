import {UserRepository} from "../repositories/user.repository";
import bcrypt, {compare} from "bcrypt";
import {generateHash} from "../helpers/hashPassword";

const Repository = new UserRepository()
export class AuthService {
  async login (body: any) {
    const user = await Repository.getOne(body.loginOrEmail);
    if(!user){
      return false;
    }
    const validPassword = await compare(body.password, user.hashPassword);
    if(!validPassword){
      return false;
    }
    return true;
  }
}