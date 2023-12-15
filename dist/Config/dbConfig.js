"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
function connectDatabase(dbUri) {
    (0, mongoose_1.connect)(dbUri).then(() => {
        console.log("db connected");
    });
}
exports.default = connectDatabase;
