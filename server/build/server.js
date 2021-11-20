"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const typeorm_1 = require("typeorm");
const app_1 = require("./app");
const ormconfig_1 = require("./ormconfig");
const validateEnv_1 = require("./utils/validateEnv");
(0, validateEnv_1.validateEnv)();
(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const connection = yield (0, typeorm_1.createConnection)(ormconfig_1.config);
        yield connection.runMigrations();
    }
    catch (error) {
        console.log("Error connecting to the database", error);
        return error;
    }
    const app = new app_1.App([], parseInt(process.env.port || "5000"));
    app.listen();
}))();
//# sourceMappingURL=server.js.map