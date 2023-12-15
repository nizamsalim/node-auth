"use strict";
// const AuthenticdationErrors = {
//   "auth/fld-inv":
//     "Authentication field in configuration does not match with authentication field in request body.",
//   "auth/em-ex": "User with the given email already exists.",
//   "auth/ph-inv": "The given phone number is not valid.",
//   "auth/em-inv": "The given email address is not valid.",
//   "auth/em-ver": "The given email address has not been verified.",
// } as Map<string,string>
Object.defineProperty(exports, "__esModule", { value: true });
let AuthenticationErrors = new Map([
    [
        "auth/fld-inv",
        "Authentication field in configuration does not match with authentication field in request body.",
    ],
    [
        "auth/cnf-inv",
        'Invalid authentication configuration. (Check "name" and "phone" fields)',
    ],
    ["auth/em-ex", "User with the given email already exists."],
    ["auth/ph-inv", "The given phone number is not valid."],
    ["auth/em-inv", "The given email address is not valid."],
    ["auth/em-ver", "The given email address has not been verified."],
    ["auth/pwd-inv", "The password should be minimum 6 characters long."],
    ["srv", "Some internal error occurred."],
]);
exports.default = AuthenticationErrors;
