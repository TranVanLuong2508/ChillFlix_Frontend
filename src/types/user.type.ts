export interface IUser {
  userId: number;
  email: string;
  fullName: string;
  roleId: number;
  genderCode: string;
  isVip: boolean;
  statusCode: string;
}
export interface DataFieldInLoginResponse {
  access_token: string;
  user: IUser;
}

export interface LoginResponse {
  statusCode: number;
  message: string;
  EC: number;
  EM: string;
  data: DataFieldInLoginResponse;
}
