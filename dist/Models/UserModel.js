"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    name: String,
    email: { required: true, type: String },
    password: { required: true, type: String },
    phone: String,
    username: String,
});
exports.default = (0, mongoose_1.model)("user", userSchema);
