export interface IUser {
  id: string;
  login: string;
  email: string;
  createdAt: Date;
  salt: string;
  hashPassword: string;
}