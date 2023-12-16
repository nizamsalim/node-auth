import { AuthenticationErrorCodes } from "../Enums/index";
import {
  AuthenticationOptions,
  SignupAuthenticationBody,
  AuthenticationFailure,
} from "../Interfaces/index";

export default class ValidationHelper {
  public validateEmail(inputStr: string): boolean {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(inputStr).toLowerCase());
  }

  public validatePhone(inputStr: string): boolean {
    const re = /^(\+91[\-\s]?)?[0]?(91)?[789]\d{9}$/;
    return re.test(String(inputStr));
  }

  public validatePassword(inputStr: string): boolean {
    return inputStr.length >= 6;
  }

  public verifyEmail(email: String): boolean {
    return true;
  }

  public validateAuthBody(
    authOpts: AuthenticationOptions,
    authBody: SignupAuthenticationBody
  ): AuthenticationFailure {
    let failure = new AuthenticationFailure();
    if (authOpts.name && !authBody.name) {
      failure.setErrorCode(AuthenticationErrorCodes.MISSING_NAME);
      return failure;
    }
    if (authOpts.phone && !authBody.phone) {
      failure.setErrorCode(AuthenticationErrorCodes.MISSING_PHONE);
      return failure;
    }
    if (authOpts.username && !authBody.username) {
      failure.setErrorCode(AuthenticationErrorCodes.MISSING_USERNAME);
      return failure;
    }
    if (!authOpts.name && authBody.name) {
      failure.setErrorCode(AuthenticationErrorCodes.NAME_CNF_MISMATCH);
      return failure;
    }
    if (!authOpts.phone && authBody.phone) {
      failure.setErrorCode(AuthenticationErrorCodes.PHONE_CNF_MISMATCH);
      return failure;
    }
    if (!authOpts.username && authBody.username) {
      failure.setErrorCode(AuthenticationErrorCodes.USERNAME_CNF_MISMATCH);
      return failure;
    }
    failure.setStatus();
    return failure;
  }
}
