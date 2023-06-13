export interface IUser {
  login: string;
  email: string;
  createdAt: Date;
  salt: string;
  hashPassword: string;
}