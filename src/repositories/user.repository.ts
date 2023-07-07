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
  async findOneById(id: ObjectId | string): Promise<IUser | null> {
    let filter: any = {}
    if(ObjectId.isValid(id)){
      filter = {_id: new ObjectId(id)}
    }

    if(!ObjectId.isValid(id)){
      filter = {id: id}
    }
    return await userCollection.findOne(filter, {projection: { _id: 0, hashPassword: 0}});
  }
  async create(body: any): Promise<ObjectId> {
    const { insertedId } = await userCollection.insertOne(body);
    return insertedId;
  }

  async delete(id: string): Promise<boolean> {
    const { deletedCount } = await userCollection.deleteOne({id});
    if(deletedCount === 0){
      return false
    }
    return true
  }
}