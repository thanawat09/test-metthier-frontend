export interface DataList<T> {
  items: T[];
  meta: Meta;
}
export interface Meta {
  page: number;
  limit: number;
  itemCount: number;
  totalPages: number;
  totalItems: number;
}

export interface HttpResponse<T> {
  data?: T;
  message?: string;
  error?: string;
  statusCode?: string;
}
