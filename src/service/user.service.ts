import {QueryBuilder} from "../helpers/query-builder";
import {TMeta} from "../types/meta.type";
import {Document} from "mongodb";
import {UserRepository} from "../repositories/user.repository";
import {TResponseWithData} from "../types/respone-with-data.type";
import {IUser} from "../types/user.interface";
import bcrypt from 'bcrypt';
import {generateHash} from "../helpers/hashPassword";

const Repository = new UserRepository();
export class UserService {
  async getAll(query: any): Promise<TResponseWithData<IUser[], TMeta, 'items', 'meta'>> {
    const querySearch = QueryBuilder(query);
    const meta: TMeta = {
      ...querySearch,
      totalCount: 0
    };
    const {data, totalCount} = await Repository.getAll(querySearch);
    meta.totalCount = totalCount;
    data.map((blog: Document) => {
      delete blog._id
    })
    return { items: data, meta: meta }
  }

  async create(body: any) {
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await generateHash(body.password, salt);
    const user = {
      id: (+new Date()).toString(),
      hashPassword,
      email: body.email,
      login: body.login,
      createdAt: new Date()
    }
    const newUserId = await Repository.create(user);
    return await Repository.findOne((newUserId));
  }

  async delete(id: string) {
    return await Repository.delete(id)
  }
}