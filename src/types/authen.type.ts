export type LoginInput = {
  email: string;
  password: string;
};

export interface AuthRes<T> {
  EC?: number;
  EM?: string;
  data?: {
    access_token: string;
    user: T;
  };
  message?: string;
  statusCode?: string;
}
