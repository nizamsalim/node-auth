import { AuthenticationFailure } from "../Interfaces/index";
import {
  AuthenticationOptions,
  SignupAuthenticationBody,
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
      failure.setErrorCode("auth/nm-abs");
      return failure;
    }
    if (authOpts.phone && !authBody.phone) {
      failure.setErrorCode("auth/ph-abs");
      return failure;
    }
    if (authOpts.username && !authBody.username) {
      failure.setErrorCode("auth/unm-abs");
      return failure;
    }
    if (!authOpts.name && authBody.name) {
      failure.setErrorCode("auth/nmcnf-inv");
      return failure;
    }
    if (!authOpts.phone && authBody.phone) {
      failure.setErrorCode("auth/phcnf-inv");
      return failure;
    }
    if (!authOpts.username && authBody.username) {
      failure.setErrorCode("auth/unmcnf-inv");
      return failure;
    }
    failure.setStatus();
    return failure;
  }
}
