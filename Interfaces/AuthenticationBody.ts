export interface SignupAuthenticationBody {
  email?: string;
  username?: string;
  password: string;
  phone?: string;
  name?: string;
}

export interface LoginAuthenticationBody {
  authenticationField: string; //username or email
  password: string;
}
