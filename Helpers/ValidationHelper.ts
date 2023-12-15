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
}
