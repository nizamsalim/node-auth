"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NodeAuthentication = void 0;
const dbConfig_1 = __importDefault(require("./Config/dbConfig"));
const ValidationHelper_1 = __importDefault(require("./Helpers/ValidationHelper"));
const index_1 = require("./Interfaces/index");
const index_2 = require("./Enums/index");
const UserModel_1 = __importDefault(require("./Models/UserModel"));
const bcrypt_1 = require("bcrypt");
class NodeAuthentication {
    constructor(databaseUrl, authenticationOptions) {
        this.databaseURL = databaseUrl;
        this.authenticationOptions = authenticationOptions;
        this.initDatabase();
        this.validation = new ValidationHelper_1.default();
    }
    initDatabase() {
        (0, dbConfig_1.default)(this.databaseURL);
    }
    userSignupWithEmailAndPassword(authBody) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                let failure = new index_1.AuthenticationFailure();
                try {
                    if (!authBody.email) {
                        failure.setErrorCode(index_2.AuthenticationErrorCodes.MISSING_EMAIL);
                        return reject(failure.toObject());
                    }
                    const authBodyFailure = this.validation.validateAuthBody(this.authenticationOptions, authBody);
                    if (!authBodyFailure.getStatus()) {
                        return reject(authBodyFailure.toObject());
                    }
                    const passwordIsValid = this.validation.validatePassword(authBody.password);
                    if (!passwordIsValid) {
                        failure.setErrorCode(index_2.AuthenticationErrorCodes.WEAK_PASSWORD);
                        return reject(failure.toObject());
                    }
                    const emailIsValid = this.validation.validateEmail(authBody.email);
                    if (!emailIsValid) {
                        failure.setErrorCode(index_2.AuthenticationErrorCodes.INVALID_EMAIL);
                        return reject(failure.toObject());
                    }
                    const phoneIsValid = authBody.phone
                        ? this.validation.validatePhone(authBody.phone)
                        : null;
                    if (authBody.phone && !phoneIsValid) {
                        failure.setErrorCode(index_2.AuthenticationErrorCodes.INVALID_PHONE);
                        return reject(failure.toObject());
                    }
                    const emailIsVerified = this.authenticationOptions
                        .verification
                        ? this.validation.verifyEmail(authBody.email)
                        : null;
                    if (this.authenticationOptions.verification && !emailIsVerified) {
                        failure.setErrorCode(index_2.AuthenticationErrorCodes.UNVERIFIED_USER);
                        return reject(failure.toObject());
                    }
                    const emailExists = yield UserModel_1.default.findOne({
                        email: authBody.email,
                    });
                    if (emailExists) {
                        failure.setErrorCode(index_2.AuthenticationErrorCodes.EMAIL_EXISTS);
                        return reject(failure.toObject());
                    }
                    const pwdHash = (0, bcrypt_1.hashSync)(authBody.password, 10);
                    const user = yield UserModel_1.default.create({
                        email: authBody.email,
                        password: pwdHash,
                        name: authBody.name,
                        phone: authBody.phone,
                        username: authBody.username,
                    });
                    let success = new index_1.AuthenticationSuccess(user);
                    return resolve(success.toObject());
                }
                catch (error) {
                    console.log(error);
                    failure.setErrorCode(index_2.AuthenticationErrorCodes.SERVICE_ERROR);
                    return reject(failure.toObject());
                }
            }));
        });
    }
    userLoginWithEmailAndPassword(authBody) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                let failure = new index_1.AuthenticationFailure();
                try {
                    const emailIsValid = this.validation.validateEmail(authBody.authenticationField);
                    if (!emailIsValid) {
                        failure.setErrorCode(index_2.AuthenticationErrorCodes.INVALID_EMAIL);
                        return reject(failure.toObject());
                    }
                    const user = yield UserModel_1.default.findOne({
                        email: authBody.authenticationField,
                    });
                    if (!user) {
                        failure.setErrorCode(index_2.AuthenticationErrorCodes.USER_NOT_FOUND);
                        return reject(failure.toObject());
                    }
                    const passwordMatch = (0, bcrypt_1.compareSync)(authBody.password, user.password);
                    if (!passwordMatch) {
                        failure.setErrorCode(index_2.AuthenticationErrorCodes.INCORRECT_PASSWORD);
                        return reject(failure.toObject());
                    }
                    let success = new index_1.AuthenticationSuccess(user);
                    return resolve(success.toObject());
                }
                catch (error) {
                    failure.setErrorCode(index_2.AuthenticationErrorCodes.SERVICE_ERROR);
                    return reject(failure.toObject());
                }
            }));
        });
    }
}
exports.NodeAuthentication = NodeAuthentication;
