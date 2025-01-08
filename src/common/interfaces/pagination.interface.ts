export interface Pagination<T> {
    status: string,
    data: T[],
    totalItems: number,
    totalPages: number,
    pageBegin: number,
    pageEnd: number
  }