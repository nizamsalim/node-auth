"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthenticationField = void 0;
const NodeAuthentication_1 = require("./NodeAuthentication");
const index_1 = require("./Enums/index");
Object.defineProperty(exports, "AuthenticationField", { enumerable: true, get: function () { return index_1.AuthenticationField; } });
const DB_URI = "mongodb+srv://nizam:nizam@cluster0.1zhlvbo.mongodb.net/NodeAuthModule?retryWrites=true&w=majority";
const auth = new NodeAuthentication_1.NodeAuthentication(DB_URI, {
    name: true,
});
const login = (a) => {
    if (a == 0) {
        auth
            .userLoginWithEmailAndPassword({
            authenticationField: "nizam@gm.com",
            password: "nizam123",
        })
            .then((res) => {
            console.log(res);
        }, (res) => {
            console.log(res);
        });
    }
    else if (a == 1) {
        auth
            .userLoginWithUsernameAndPassword({
            authenticationField: "nizamsalim",
            password: "nizam123",
        })
            .then((res) => {
            console.log(res);
        }, (res) => {
            console.log(res);
        });
    }
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
// signup();
login(1);
exports.default = NodeAuthentication_1.NodeAuthentication;
