import {IQuery} from "../types/query.interface";
import {FindAllWithCount} from "../helpers/findAllWithCount";
import {userCollection} from "../index";
import {IUser} from "../types/user.interface";
import {TResponseWithData} from "../types/respone-with-data.type";
import {ObjectId, WithId} from "mongodb";

export class UserRepository {

  async getAll(query: IQuery): Promise<TResponseWithData<WithId<IUser>[], number, 'data', 'totalCount'>> {
    return await FindAllWithCount<IUser>(query, userCollection, null);
  }

  async getOne(search: string): Promise<IUser | null> {
    return userCollection.findOne({$or: [{email: search}, {login: search}]});
  }
  async findOne(id: ObjectId): Promise<IUser | null> {
    return await userCollection.findOne({_id: new ObjectId(id)}, {projection: { _id: 0}});
  }
  async create(body: any): Promise<ObjectId> {
    const { insertedId } = await userCollection.insertOne(body);
    return insertedId;
  }

  async delete(id: string) {
    const { deletedCount } = await userCollection.deleteOne({id});
    if(deletedCount === 0){
      return false
    }
    return true
  }
}