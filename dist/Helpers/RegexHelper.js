"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class RegexHelper {
    validateEmail(inputStr) {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(inputStr).toLowerCase());
    }
    validatePhone(inputStr) {
        const re = /^(\+91[\-\s]?)?[0]?(91)?[789]\d{9}$/;
        return re.test(String(inputStr));
    }
}
exports.default = RegexHelper;
