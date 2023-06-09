import { postCollection } from "../index";
import {IQuery} from "../types/query.interface";
import {TResponseWithData} from "../types/respone-with-data.type";
import {FindAllWithCount} from "../helpers/findAllWithCount";
import {IPost} from "../types/post.interface";
import {WithId} from "mongodb";

export class PostRepository {
  async find(query: IQuery): Promise<TResponseWithData<WithId<IPost>[], number, 'data', 'totalCount'>> {
    return await FindAllWithCount<IPost>(query, postCollection, null)
  }

  async findOne(id: string): Promise<IPost | null> {
    return await postCollection.findOne({ id: id});
  }

  async create(body: any): Promise<IPost | null> {
    const { insertedId } = await postCollection.insertOne(body);
    return await postCollection.findOne({_id: insertedId}, {projection: { _id: 0}})
  }

  async update(id: string, body: any): Promise<boolean> {
    const { matchedCount } = await postCollection.updateOne({id}, {$set: body});
    if(matchedCount === 0){
      return false
    }
    return true
  }

  async delete(id: string): Promise<boolean> {
    const { deletedCount } = await postCollection.deleteOne({id});
    if(deletedCount === 0){
      return false
    }
    return true
  }
}