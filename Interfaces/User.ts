export default interface User {
  name?: string;
  field: string;
  password: string;
  phone?: string;
}

export interface ResponseUser {
  name?: string;
  field: string;
  _id: string;
  phone?: string;
}
