import { AuthenticationField } from "../Enums/index";

export default interface AuthenticationOptions {
  authenticationField: AuthenticationField;
  verification?: boolean;
  phone?: boolean;
  name?: boolean;
}
