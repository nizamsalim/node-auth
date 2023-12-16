import { AuthenticationField } from "../Enums";

export interface SignupAuthenticationBody {
  email?: string;
  username?: string;
  password: string;
  phone?: string;
  name?: string;
}

export interface LoginAuthenticationBody {}
