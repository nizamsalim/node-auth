import connectDatabase from "./Config/dbConfig";
import ValidationHelper from "./Helpers/ValidationHelper";
import {
  LoginAuthenticationBody,
  SignupAuthenticationBody,
  AuthenticationOptions,
  AuthenticationFailure,
  AuthenticationSuccess,
  User,
} from "./Interfaces/index";
import { AuthenticationErrorCodes } from "./Enums/index";
import UserModel from "./Models/UserModel";
import { HydratedDocument } from "mongoose";
import { hashSync, compareSync } from "bcrypt";

export class NodeAuthentication {
  private authenticationOptions: AuthenticationOptions;
  private databaseURL: string;
  private validation: ValidationHelper;
  constructor(
    databaseUrl: string,
    authenticationOptions: AuthenticationOptions
  ) {
    this.databaseURL = databaseUrl;
    this.authenticationOptions = authenticationOptions;
    this.initDatabase();
    this.validation = new ValidationHelper();
  }
  private initDatabase() {
    connectDatabase(this.databaseURL);
  }
  public async userSignupWithEmailAndPassword(
    authBody: SignupAuthenticationBody
  ): Promise<Object> {
    return new Promise(async (resolve, reject) => {
      let failure = new AuthenticationFailure();
      try {
        if (!authBody.email) {
          failure.setErrorCode(AuthenticationErrorCodes.MISSING_EMAIL);
          return reject(failure.toObject());
        }

        const authBodyFailure: AuthenticationFailure =
          this.validation.validateAuthBody(
            this.authenticationOptions,
            authBody
          );
        if (!authBodyFailure.getStatus()) {
          return reject(authBodyFailure.toObject());
        }

        const passwordIsValid: boolean = this.validation.validatePassword(
          authBody.password
        );
        if (!passwordIsValid) {
          failure.setErrorCode(AuthenticationErrorCodes.WEAK_PASSWORD);
          return reject(failure.toObject());
        }

        const emailIsValid: boolean = this.validation.validateEmail(
          authBody.email!
        );
        if (!emailIsValid) {
          failure.setErrorCode(AuthenticationErrorCodes.INVALID_EMAIL);
          return reject(failure.toObject());
        }

        const phoneIsValid: boolean | null = authBody.phone
          ? this.validation.validatePhone(authBody.phone)
          : null;
        if (authBody.phone && !phoneIsValid) {
          failure.setErrorCode(AuthenticationErrorCodes.INVALID_PHONE);
          return reject(failure.toObject());
        }

        const emailIsVerified: boolean | null = this.authenticationOptions
          .verification
          ? this.validation.verifyEmail(authBody.email!)
          : null;
        if (this.authenticationOptions.verification && !emailIsVerified) {
          failure.setErrorCode(AuthenticationErrorCodes.UNVERIFIED_USER);
          return reject(failure.toObject());
        }

        const emailExists = await UserModel.findOne({
          email: authBody.email!,
        });
        if (emailExists) {
          failure.setErrorCode(AuthenticationErrorCodes.EMAIL_EXISTS);
          return reject(failure.toObject());
        }

        const pwdHash = hashSync(authBody.password, 10);

        const user: HydratedDocument<User> = await UserModel.create({
          email: authBody.email!,
          password: pwdHash,
          name: authBody.name,
          phone: authBody.phone,
          username: authBody.username,
        });
        let success = new AuthenticationSuccess(user);
        return resolve(success.toObject());
      } catch (error) {
        console.log(error);
        failure.setErrorCode(AuthenticationErrorCodes.SERVICE_ERROR);
        return reject(failure.toObject());
      }
    });
  }

  public async userLoginWithEmailAndPassword(
    authBody: LoginAuthenticationBody
  ): Promise<Object> {
    return new Promise(async (resolve, reject) => {
      let failure = new AuthenticationFailure();
      try {
        const emailIsValid: boolean = this.validation.validateEmail(
          authBody.authenticationField
        );
        if (!emailIsValid) {
          failure.setErrorCode(AuthenticationErrorCodes.INVALID_EMAIL);
          return reject(failure.toObject());
        }

        const user: HydratedDocument<User> | null = await UserModel.findOne({
          email: authBody.authenticationField,
        });
        if (!user) {
          failure.setErrorCode(AuthenticationErrorCodes.USER_NOT_FOUND);
          return reject(failure.toObject());
        }

        const passwordMatch: boolean = compareSync(
          authBody.password,
          user.password
        );
        if (!passwordMatch) {
          failure.setErrorCode(AuthenticationErrorCodes.INCORRECT_PASSWORD);
          return reject(failure.toObject());
        }

        let success = new AuthenticationSuccess(user);
        return resolve(success.toObject());
      } catch (error) {
        failure.setErrorCode(AuthenticationErrorCodes.SERVICE_ERROR);
        return reject(failure.toObject());
      }
    });
  }
}
