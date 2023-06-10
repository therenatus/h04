import {IQuery} from "../types/query.interface";

export const QueryBuilder = (query: any) => {
  const QuerySearch: IQuery = {
    searchNameTerm: query.searchNameTerm ? query.searchNameTerm : null,
    pageSize: query.pageSize ? +query.pageSize : 10,
    pageNumber: query.pageNumber ? +query.pageNumber : 1,
    sortDirection: query.sortDirection ? query.sortDirection: 'desc'
  }
  return QuerySearch;
}