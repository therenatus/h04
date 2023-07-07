import {UserRepository} from "../repositories/user.repository";
import {compare} from "bcrypt";
import {IUser} from "../types/user.interface";
import {ObjectId} from "mongodb";

const Repository = new UserRepository()
export class AuthService {
  async login (body: any): Promise<IUser | boolean> {
    const user = await Repository.getOne(body.loginOrEmail);
    if(!user){
      return false;
    }
    const validPassword = await compare(body.password, user.hashPassword);
    if(!validPassword){
      return false;
    }
    return user;
  }

  async getMe(userID: string | ObjectId): Promise<IUser | boolean> {
    const me = await Repository.findOneById(userID);
    if(!me){
      return false
    }
    return me;
  }
}