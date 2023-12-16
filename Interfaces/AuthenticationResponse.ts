import { HydratedDocument } from "mongoose";
import { AuthenticationErrors } from "../Enums/index";
import { User, ResponseUser } from "./User";
import { sign } from "jsonwebtoken";

export class AuthenticationSuccess {
  private success: boolean = true;
  private authToken?: string;
  private user?: ResponseUser;
  constructor(user: HydratedDocument<User>) {
    this.user = {
      _id: user._id.toString(),
      name: user.name,
      email: user.email,
      phone: user.phone,
      username: user.username,
    };
    this.user.name == undefined && delete this.user["name"];
    this.user.phone == undefined && delete this.user["phone"];
    this.user.username == undefined && delete this.user["username"];

    this.getAuthToken();
  }
  private getAuthToken() {
    const payload = {
      _id: this.user!._id,
      email: this.user!.email,
    };
    const JWT_KEY =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890987654321";
    const authToken = sign(payload, JWT_KEY);
    this.authToken = authToken;
  }
  public toObject() {
    return {
      success: this.success,
      authToken: this.authToken,
      user: this.user,
    };
  }
}

export class AuthenticationFailure {
  private success: boolean = false;
  private errorMessage?: string;
  private errorCode?: string;
  public setErrorCode(erCode: string) {
    this.errorCode = erCode;
    this.errorMessage = AuthenticationErrors.get(erCode);
  }
  public toObject(): Object {
    return {
      success: this.success,
      error: {
        errorCode: this.errorCode,
        errorMessage: this.errorMessage,
      },
    };
  }
  public getStatus(): boolean {
    return this.success;
  }
  public setStatus() {
    this.success = true;
  }
}
