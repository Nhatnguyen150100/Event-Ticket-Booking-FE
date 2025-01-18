type IStatusResponse = 200 | 400 | 401 | 403 | 500;

export interface IBaseResponse<T> {
  data: T;
  message: string;
  status: IStatusResponse;
}

export interface IBaseResponseList<T> {
  content: T;
  totalCount: number;
}
