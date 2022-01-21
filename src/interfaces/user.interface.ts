export interface User {
  id?: string;
  name?: string;
  email: string;
  avatar?: string;
  password: string;
  role?: string;
  recoveryToken?: string;
}
