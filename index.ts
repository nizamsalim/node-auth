import { NodeAuthentication } from "./NodeAuthentication";
import {
  SignupAuthenticationBody,
  AuthenticationOptions,
} from "./Interfaces/index";
import { AuthenticationField } from "./Enums/index";

const DB_URI =
  "mongodb+srv://nizam:nizam@cluster0.1zhlvbo.mongodb.net/NodeAuthModule?retryWrites=true&w=majority";

const auth = new NodeAuthentication(DB_URI, {
  name: true,
});

const login = () => {
  auth
    .userLoginWithEmailAndPassword({
      authenticationField: "nizam@gm.com",
      password: "nizam123",
    })
    .then(
      (res) => {
        console.log(res);
      },
      (res) => {
        console.log(res);
      }
    );
};

const signup = () => {
  auth
    .userSignupWithEmailAndPassword({
      email: "nizam@gm.com",
      password: "nizam123",
      name: "Nizam",
    })
    .then((res) => {
      console.log(res);
    })
    .catch((res) => {
      console.error(res);
    });
};

signup();
// login();

export default NodeAuthentication;

export { SignupAuthenticationBody, AuthenticationOptions, AuthenticationField };
