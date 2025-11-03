export interface IBackendRes<T> {
  EC?: number;
  EM?: string;
  data?: any;
  message?: string;
  statusCode?: string;
}
