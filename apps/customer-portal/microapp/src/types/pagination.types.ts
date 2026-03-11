export interface Pagination {
  totalRecords: number;
  offset: number;
  limit: number;
}

export type PaginatedArray<T> = T[] & { pagination: Pagination };
