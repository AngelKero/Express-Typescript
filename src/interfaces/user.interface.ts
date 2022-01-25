export interface User {
  _id?: string;
  name?: string;
  email: string;
  avatar?: string;
  password?: string;
  role?: string;
  recoveryToken?: string;
  hashPassword?: Function;
}
