import connectDatabase from "./Config/dbConfig";
import AuthenticationField from "./Enums/AuthenticationField";
import ValidationHelper from "./Helpers/ValidationHelper";
import AuthenticationBody from "./Interfaces/AuthenticationBody";
import AuthenticationOptions from "./Interfaces/AuthenticationOptions";
import {
  AuthenticationFailure,
  AuthenticationSuccess,
} from "./Interfaces/AuthenticationResponse";
import UserModel from "./Models/UserModel";
import { HydratedDocument } from "mongoose";
import { hashSync } from "bcrypt";
import User from "./Interfaces/User";

export class NodeAuthentication {
  private authenticationOptions: AuthenticationOptions;
  private databaseURL: string;
  constructor(
    databaseUrl: string,
    authenticationOptions: AuthenticationOptions
  ) {
    this.databaseURL = databaseUrl;
    this.authenticationOptions = authenticationOptions;
    this.initDatabase();
  }
  private initDatabase() {
    connectDatabase(this.databaseURL);
  }
  public async userSignupWithEmailAndPassword(
    authBody: AuthenticationBody
  ): Promise<Object> {
    return new Promise(async (resolve, reject) => {
      let failure = new AuthenticationFailure();
      try {
        if (
          this.authenticationOptions.authenticationField !=
          AuthenticationField.email
        ) {
          failure.setErrorCode("auth/fld-inv");
          return reject(failure.toObject());
        }

        if (
          (!this.authenticationOptions.name && authBody.name) ||
          (!this.authenticationOptions.phone && authBody.phone) ||
          (this.authenticationOptions.name && !authBody.name) ||
          (this.authenticationOptions.phone && !authBody.phone)
        ) {
          failure.setErrorCode("auth/cnf-inv");
          return reject(failure.toObject());
        }

        const validation = new ValidationHelper();

        const passwordIsValid: boolean = validation.validatePassword(
          authBody.password
        );
        if (!passwordIsValid) {
          failure.setErrorCode("auth/pwd-inv");
          return reject(failure.toObject());
        }

        const emailIsValid: boolean = validation.validateEmail(
          authBody.authenticationFieldValue
        );
        if (!emailIsValid) {
          failure.setErrorCode("auth/em-inv");
          return reject(failure.toObject());
        }

        const phoneIsValid: boolean | null = authBody.phone
          ? validation.validatePhone(authBody.phone)
          : null;
        if (authBody.phone && !phoneIsValid) {
          failure.setErrorCode("auth/ph-inv");
          return reject(failure.toObject());
        }

        const emailIsVerified: boolean | null = this.authenticationOptions
          .verification
          ? validation.verifyEmail(authBody.authenticationFieldValue)
          : null;
        if (this.authenticationOptions.verification && !emailIsVerified) {
          failure.setErrorCode("auth/em-ver");
          return reject(failure.toObject());
        }

        const emailExists = await UserModel.findOne({
          field: authBody.authenticationFieldValue,
        });
        if (emailExists) {
          failure.setErrorCode("auth/em-ex");
          return reject(failure.toObject());
        }

        const pwdHash = hashSync(authBody.password, 10);

        const user: HydratedDocument<User> = await UserModel.create({
          field: authBody.authenticationFieldValue,
          password: pwdHash,
          name: authBody.name,
          phone: authBody.phone,
        });
        let success = new AuthenticationSuccess(user);
        return resolve(success.toObject());
      } catch (error) {
        failure.setErrorCode("srv");
        return reject(failure.toObject());
      }
    });
  }
}

export class TestClass {
  constructor(msg: string) {
    console.log("hello " + msg);
  }
  public method(a: number) {
    if (a > 10) {
      throw new Error("poda myre");
    }
    console.log(a);
  }
  public asyncMethod(a: number): Promise<boolean | object> {
    return new Promise((resolve, reject) => {
      if (a > 10) {
        resolve(true);
      } else {
        reject({
          success: false,
          error: {
            errorCode: "auth/fld-inv",
            errorMessage: "Field does not match",
          },
        });
      }
    });
  }
}
