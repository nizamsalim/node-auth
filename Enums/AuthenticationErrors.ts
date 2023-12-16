// const AuthenticdationErrors = {
//   "auth/fld-inv":
//     "Authentication field in configuration does not match with authentication field in request body.",
//   "auth/em-ex": "User with the given email already exists.",
//   "auth/ph-inv": "The given phone number is not valid.",
//   "auth/em-inv": "The given email address is not valid.",
//   "auth/em-ver": "The given email address has not been verified.",
// } as Map<string,string>

let AuthenticationErrors = new Map<string, string>([
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
]);

export default AuthenticationErrors;
