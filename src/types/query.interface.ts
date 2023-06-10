export interface IQuery {
  searchNameTerm: string | null
  sortDirection: directionEnum,
  pageNumber: number,
  pageSize: number
}

enum directionEnum  {
  ASC ='asc',
  DESC = 'desc',
}