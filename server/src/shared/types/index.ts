export type BasePageableResult<T> = {
  results: T[];
  total: number;
  page: number;
  limit: number;
};

export type BasePageableParams = {
  page: number;
  limit: number;
};
