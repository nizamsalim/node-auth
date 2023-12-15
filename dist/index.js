"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthenticationField = void 0;
const NodeAuthentication_1 = require("./NodeAuthentication");
const index_1 = require("./Enums/index");
Object.defineProperty(exports, "AuthenticationField", { enumerable: true, get: function () { return index_1.AuthenticationField; } });
const DB_URI = "mongodb+srv://nizam:nizam@cluster0.1zhlvbo.mongodb.net/NodeAuthModule?retryWrites=true&w=majority";
const auth = new NodeAuthentication_1.NodeAuthentication(DB_URI, {
    authenticationField: index_1.AuthenticationField.email,
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
exports.default = NodeAuthentication_1.NodeAuthentication;