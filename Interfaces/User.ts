export interface User {
  name?: string;
  email: string;
  password: string;
  phone?: string;
  username?: string;
}

export interface ResponseUser {
  name?: string;
  email: string;
  _id: string;
  phone?: string;
  username?: string;
}
