"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthenticationFailure = exports.AuthenticationSuccess = void 0;
const index_1 = require("../Enums/index");
const jsonwebtoken_1 = require("jsonwebtoken");
class AuthenticationSuccess {
    constructor(user) {
        this.success = true;
        this.user = {
            _id: user._id.toString(),
            name: user.name,
            email: user.email,
            phone: user.phone,
            username: user.username,
        };
        this.user.name == undefined && delete this.user["name"];
        this.user.phone == undefined && delete this.user["phone"];
        this.user.username == undefined && delete this.user["username"];
        this.getAuthToken();
    }
    getAuthToken() {
        const payload = {
            _id: this.user._id,
            email: this.user.email,
        };
        const JWT_KEY = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890987654321";
        const authToken = (0, jsonwebtoken_1.sign)(payload, JWT_KEY);
        this.authToken = authToken;
    }
    toObject() {
        return {
            success: this.success,
            authToken: this.authToken,
            user: this.user,
        };
    }
}
exports.AuthenticationSuccess = AuthenticationSuccess;
class AuthenticationFailure {
    constructor() {
        this.success = false;
    }
    setErrorCode(erCode) {
        this.errorCode = erCode;
        this.errorMessage = index_1.AuthenticationErrors.get(erCode);
    }
    toObject() {
        return {
            success: this.success,
            error: {
                errorCode: this.errorCode,
                errorMessage: this.errorMessage,
            },
        };
    }
    getStatus() {
        return this.success;
    }
    setStatus() {
        this.success = true;
    }
}
exports.AuthenticationFailure = AuthenticationFailure;
