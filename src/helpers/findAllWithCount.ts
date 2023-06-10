import {IQuery} from "../types/query.interface";
import {TResponseWithData} from "../types/respone-with-data.type";
import {Collection, Document, WithId} from "mongodb";

//@ts-ignore
export async function FindAllWithCount<T>(query: IQuery, collection: Collection<T>, id: string | null): Promise<TResponseWithData<WithId<T>[], number, 'data', 'totalCount'>> {
  const {searchNameTerm, sortDirection, pageSize, pageNumber, sortBy} = query;
  let filter = {}
  const sortOptions: { [key: string]: any } = {};
  sortOptions[sortBy as string] = sortDirection;
  if (searchNameTerm) {
    filter = {name: {$regex: searchNameTerm, $options: "i"}};
  }
  if(id){
    filter = { blogId: id}
  }
  const total = await collection.countDocuments(filter);
  const data =  await collection
    .find(filter)
    .sort(sortOptions)
    .skip(+pageSize * (pageNumber - 1))
    .limit(+pageSize)
    .toArray();

  return {data: data, totalCount: total}
}