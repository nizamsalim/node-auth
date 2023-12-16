"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthenticationErrorCodes = exports.AuthenticationErrors = void 0;
exports.AuthenticationErrors = new Map([
    [
        "auth/fld-inv",
        "Authentication field in configuration does not match with authentication field in request body.",
    ],
    ["auth/em-ex", "User with the given email already exists."],
    ["auth/ph-inv", "The given phone number is not valid."],
    ["auth/em-inv", "The given email address is not valid."],
    ["auth/em-ver", "The given email address has not been verified."],
    ["auth/pwd-inv", "The password should be minimum 6 characters long."],
    ["srv", "Some internal error occurred."],
    ["auth/em-abs", "Email is not present in the request body"],
    ["auth/nm-abs", "Name is not present in request body"],
    ["auth/ph-abs", "Phone is not present in request body"],
    ["auth/unm-abs", "Username is not present in request body"],
    [
        "auth/nmcnf-inv",
        "Name field is not set in configuration but is given in the request body",
    ],
    [
        "auth/phcnf-inv",
        "Phone field is not set in configuration but is given in the request body",
    ],
    [
        "auth/unmcnf-inv",
        "Username field is not set in configuration but is given in the request body",
    ],
    ["auth/usr-nf", "User does not exist"],
    ["auth/pwd-inc", "Incorrect password"],
]);
exports.AuthenticationErrorCodes = {
    INVALID_FIELD: "auth/fld-inv",
    EMAIL_EXISTS: "auth/em-ex",
    INVALID_PHONE: "auth/ph-inv",
    INVALID_EMAIL: "auth/em-inv",
    UNVERIFIED_USER: "auth/em-ver",
    WEAK_PASSWORD: "auth/pwd-inv",
    SERVICE_ERROR: "srv",
    MISSING_EMAIL: "auth/em-abs",
    MISSING_NAME: "auth/nm-abs",
    MISSING_PHONE: "auth/ph-abs",
    MISSING_USERNAME: "auth/unm-abs",
    NAME_CNF_MISMATCH: "auth/nmcnf-inv",
    PHONE_CNF_MISMATCH: "auth/phcnf-inv",
    USERNAME_CNF_MISMATCH: "auth/unmcnf-inv",
    USER_NOT_FOUND: "auth/usr-nf",
    INCORRECT_PASSWORD: "auth/pwd-inc",
};
