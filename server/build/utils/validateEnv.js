"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateEnv = void 0;
const envalid_1 = require("envalid");
function validateEnv() {
    (0, envalid_1.cleanEnv)(process.env, {
        PORT: (0, envalid_1.str)(),
        DB_HOST: (0, envalid_1.str)(),
        DB_PORT: (0, envalid_1.str)(),
        DB_USER: (0, envalid_1.str)(),
        DB_PASSWORD: (0, envalid_1.str)(),
        DB_NAME: (0, envalid_1.str)(),
        NODE_ENV: (0, envalid_1.str)(),
    });
}
exports.validateEnv = validateEnv;
//# sourceMappingURL=validateEnv.js.map