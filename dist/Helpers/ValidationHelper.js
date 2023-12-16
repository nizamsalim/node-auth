"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../Enums/index");
const index_2 = require("../Interfaces/index");
class ValidationHelper {
    validateEmail(inputStr) {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(inputStr).toLowerCase());
    }
    validatePhone(inputStr) {
        const re = /^(\+91[\-\s]?)?[0]?(91)?[789]\d{9}$/;
        return re.test(String(inputStr));
    }
    validatePassword(inputStr) {
        return inputStr.length >= 6;
    }
    verifyEmail(email) {
        return true;
    }
    validateAuthBody(authOpts, authBody) {
        let failure = new index_2.AuthenticationFailure();
        if (authOpts.name && !authBody.name) {
            failure.setErrorCode(index_1.AuthenticationErrorCodes.MISSING_NAME);
            return failure;
        }
        if (authOpts.phone && !authBody.phone) {
            failure.setErrorCode(index_1.AuthenticationErrorCodes.MISSING_PHONE);
            return failure;
        }
        if (authOpts.username && !authBody.username) {
            failure.setErrorCode(index_1.AuthenticationErrorCodes.MISSING_USERNAME);
            return failure;
        }
        if (!authOpts.name && authBody.name) {
            failure.setErrorCode(index_1.AuthenticationErrorCodes.NAME_CNF_MISMATCH);
            return failure;
        }
        if (!authOpts.phone && authBody.phone) {
            failure.setErrorCode(index_1.AuthenticationErrorCodes.PHONE_CNF_MISMATCH);
            return failure;
        }
        if (!authOpts.username && authBody.username) {
            failure.setErrorCode(index_1.AuthenticationErrorCodes.USERNAME_CNF_MISMATCH);
            return failure;
        }
        failure.setStatus();
        return failure;
    }
}
exports.default = ValidationHelper;
