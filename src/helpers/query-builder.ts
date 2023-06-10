import {IQuery} from "../types/query.interface";

export const QueryBuilder = (query: any) => {
  const QuerySearch: IQuery = {
    term: query.term ? query.term : null,
    pageSize: query.pageSize ? +query.pageSize : 10,
    pageNumber: query.pageNumber ? +query.pageNumber : 1,
    sortBy: query.sortBy ? query.sortBy : 'desc'
  }
  return QuerySearch;
}