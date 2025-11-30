export interface Filter {
  page?: number;
  limit?: number;
  filters?: Record<string, unknown>;
  orderBy?: Record<string, string>;
}
export interface QueryParams {
  page?: number;
  limit?: number;
  filters?: string;
  orderBy?: string;
}

export function setQueryParams(obj?: Record<string, string | unknown>) {
  if (!obj) return '';

  const result = Object.entries(obj)
    .filter(([key, value]) => !!key && !!value)
    .map(([key, value]) => `${key}:${value}`)
    .join(',');

  return result;
}
export function getQueryParams(filter: Filter): QueryParams {
  const params: QueryParams = {};

  const page = filter?.page;
  const limit = filter?.limit;
  const filters = setQueryParams(filter?.filters);
  const orderBy = setQueryParams(filter?.orderBy);

  if (page) params.page = page;
  if (limit) params.limit = limit;
  if (filters) params.filters = filters;
  if (orderBy) params.orderBy = orderBy;

  return params;
}
