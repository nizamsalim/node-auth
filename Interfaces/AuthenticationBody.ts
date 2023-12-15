import { AuthenticationField } from "../Enums";

export default interface AuthenticationBody {
  authenticationFieldValue: string;
  password: string;
  phone?: string;
  name?: string;
}
