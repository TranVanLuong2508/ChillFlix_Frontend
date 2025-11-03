export interface IBackendRes<T> {
  EC: number;
  EM: string;
  data: T;
}
