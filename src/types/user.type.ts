export interface IUser {
  userId: number;
  email: string;
  roleId: number;
  fullName: string;
  genderCode: string;
  isVip: boolean;
  statusCode: string;
}
export interface UserData {
  access_token: string;
  user: IUser;
}

export interface LoginResponse {
  statusCode: number;
  message: string;
  EC: number;
  EM: string;
  data: UserData;
}
