import {IQuery} from "../types/query.interface";
import {TResponseWithData} from "../types/respone-with-data.type";
import {Collection, Document, WithId} from "mongodb";

//@ts-ignore
export async function FindAllWithCount<T>(query: IQuery, collection: Collection<T>, id: string | null): Promise<TResponseWithData<WithId<T>[], number, 'data', 'totalCount'>> {
  const {term, sortBy, pageSize, pageNumber} = query;

  let filter = {}
  if (term) {
    filter = {name: {$regex: term}};
  }
  if(id){
    filter = { blogId: id}
  }
  const total = await collection.countDocuments(filter);
  const data =  await collection
    .find(filter)
    .sort({createdAt: sortBy})
    .skip(+pageSize * (pageNumber - 1))
    .limit(+pageSize)
    .toArray();

  return {data: data, totalCount: total}
}