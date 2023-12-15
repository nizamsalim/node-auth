import { NodeAuthentication } from "./NodeAuthentication";
import { AuthenticationBody, AuthenticationOptions } from "./Interfaces/index";
import { AuthenticationField } from "./Enums/index";

const DB_URI =
  "mongodb+srv://nizam:nizam@cluster0.1zhlvbo.mongodb.net/NodeAuthModule?retryWrites=true&w=majority";

const auth = new NodeAuthentication(DB_URI, {
  authenticationField: AuthenticationField.email,
  name: true,
  phone: true,
});
// hello
auth
  .userSignupWithEmailAndPassword({
    authenticationFieldValue: "nizam@gm.com",
    password: "nizam123",
    phone: "7902423623",
  })
  .then((res) => {
    console.log(res);
  })
  .catch((res) => {
    console.error(res);
  });

export default NodeAuthentication;

export { AuthenticationBody, AuthenticationOptions, AuthenticationField };
