import { postCollection } from "../index";
import {IQuery} from "../types/query.interface";
import {TResponseWithData} from "../types/respone-with-data.type";
import {FindAllWithCount} from "../helpers/findAllWithCount";
import {IPost} from "../types/post.interface";
import {ObjectId, WithId} from "mongodb";

export class PostRepository {
  async find(query: IQuery): Promise<TResponseWithData<WithId<IPost>[], number, 'data', 'totalCount'>> {
    return await FindAllWithCount<IPost>(query, postCollection, null)
  }

  async findOne(id: string | ObjectId): Promise<IPost | null> {
    let findBy: any
    ObjectId.isValid(id) ? findBy = {_id: new ObjectId(id)} : findBy = { id };
    console.log(findBy)
    return await postCollection.findOne(findBy, {projection: { _id: 0}});
  }

  async create(body: any): Promise<IPost | null> {
    const { insertedId } = await postCollection.insertOne(body);
    return await postCollection.findOne({_id: insertedId}, {projection: { _id: 0}})
  }

  async update(id: string, body: any): Promise<IPost | boolean> {
    const { matchedCount, upsertedId} = await postCollection.updateOne({id}, {$set: body});
    if(matchedCount === 0){
      return false
    }
    const data = await this.findOne(upsertedId!);
    if(!data){
      return false
    }
    return data
  }

  async delete(id: string): Promise<boolean> {
    const { deletedCount } = await postCollection.deleteOne({id});
    if(deletedCount === 0){
      return false
    }
    return true
  }
}