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
exports.TestClass = exports.NodeAuthentication = void 0;
const dbConfig_1 = __importDefault(require("./Config/dbConfig"));
const ValidationHelper_1 = __importDefault(require("./Helpers/ValidationHelper"));
const AuthenticationResponse_1 = require("./Interfaces/AuthenticationResponse");
const UserModel_1 = __importDefault(require("./Models/UserModel"));
const bcrypt_1 = require("bcrypt");
class NodeAuthentication {
    constructor(databaseUrl, authenticationOptions) {
        this.databaseURL = databaseUrl;
        this.authenticationOptions = authenticationOptions;
        this.initDatabase();
    }
    initDatabase() {
        (0, dbConfig_1.default)(this.databaseURL);
    }
    userSignupWithEmailAndPassword(authBody) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                let failure = new AuthenticationResponse_1.AuthenticationFailure();
                try {
                    if (!authBody.email) {
                        failure.setErrorCode("auth/fld-abs");
                        return reject(failure.toObject());
                    }
                    const validation = new ValidationHelper_1.default();
                    const authBodyFailure = validation.validateAuthBody(this.authenticationOptions, authBody);
                    if (!authBodyFailure.getStatus()) {
                        return reject(authBodyFailure.toObject());
                    }
                    const passwordIsValid = validation.validatePassword(authBody.password);
                    if (!passwordIsValid) {
                        failure.setErrorCode("auth/pwd-inv");
                        return reject(failure.toObject());
                    }
                    const emailIsValid = validation.validateEmail(authBody.email);
                    if (!emailIsValid) {
                        failure.setErrorCode("auth/em-inv");
                        return reject(failure.toObject());
                    }
                    const phoneIsValid = authBody.phone
                        ? validation.validatePhone(authBody.phone)
                        : null;
                    if (authBody.phone && !phoneIsValid) {
                        failure.setErrorCode("auth/ph-inv");
                        return reject(failure.toObject());
                    }
                    const emailIsVerified = this.authenticationOptions
                        .verification
                        ? validation.verifyEmail(authBody.email)
                        : null;
                    if (this.authenticationOptions.verification && !emailIsVerified) {
                        failure.setErrorCode("auth/em-ver");
                        return reject(failure.toObject());
                    }
                    const emailExists = yield UserModel_1.default.findOne({
                        field: authBody.email,
                    });
                    if (emailExists) {
                        failure.setErrorCode("auth/em-ex");
                        return reject(failure.toObject());
                    }
                    const pwdHash = (0, bcrypt_1.hashSync)(authBody.password, 10);
                    const user = yield UserModel_1.default.create({
                        field: authBody.email,
                        password: pwdHash,
                        name: authBody.name,
                        phone: authBody.phone,
                    });
                    let success = new AuthenticationResponse_1.AuthenticationSuccess(user);
                    return resolve({});
                }
                catch (error) {
                    failure.setErrorCode("srv");
                    return reject(failure.toObject());
                }
            }));
        });
    }
}
exports.NodeAuthentication = NodeAuthentication;
class TestClass {
    constructor(msg) {
        console.log("hello " + msg);
    }
    method(a) {
        if (a > 10) {
            throw new Error("poda myre");
        }
        console.log(a);
    }
    asyncMethod(a) {
        return new Promise((resolve, reject) => {
            if (a > 10) {
                resolve(true);
            }
            else {
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
exports.TestClass = TestClass;
