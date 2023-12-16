import { NodeAuthentication } from "./NodeAuthentication";
import {
  SignupAuthenticationBody,
  AuthenticationOptions,
} from "./Interfaces/index";
import { AuthenticationField } from "./Enums/index";

const DB_URI =
  "mongodb+srv://nizam:nizam@cluster0.1zhlvbo.mongodb.net/NodeAuthModule?retryWrites=true&w=majority";

const auth = new NodeAuthentication(DB_URI, {
  phone: true,
  username: true,
});
// hello
auth
  .userSignupWithEmailAndPassword({
    email: "nizam@gm.com",
    password: "nizam123",
    username: "nizamsalim",
    phone: "7902423623",
  })
  .then((res) => {
    console.log(res);
  })
  .catch((res) => {
    console.error(res);
  });

export default NodeAuthentication;

export { SignupAuthenticationBody, AuthenticationOptions, AuthenticationField };
