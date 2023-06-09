export interface IQuery {
  term: string | null
  sortBy: directionEnum,
  pageNumber: number,
  pageSize: number
}

enum directionEnum  {
  ASC ='asc',
  DESC = 'desc',
}