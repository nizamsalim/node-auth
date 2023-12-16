"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../Interfaces/index");
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
        let failure = new index_1.AuthenticationFailure();
        if (authOpts.name && !authBody.name) {
            failure.setErrorCode("auth/nm-abs");
            return failure;
        }
        if (authOpts.phone && !authBody.phone) {
            failure.setErrorCode("auth/ph-abs");
            return failure;
        }
        if (authOpts.username && !authBody.username) {
            failure.setErrorCode("auth/unm-abs");
            return failure;
        }
        if (!authOpts.name && authBody.name) {
            failure.setErrorCode("auth/nmcnf-inv");
            return failure;
        }
        if (!authOpts.phone && authBody.phone) {
            failure.setErrorCode("auth/phcnf-inv");
            return failure;
        }
        if (!authOpts.username && authBody.username) {
            failure.setErrorCode("auth/unmcnf-inv");
            return failure;
        }
        failure.setStatus();
        return failure;
    }
}
exports.default = ValidationHelper;
