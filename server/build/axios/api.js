"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.api = void 0;
const axios_1 = __importDefault(require("axios"));
exports.api = axios_1.default.create({
    baseURL: "https://youtube.com/channel/",
    headers: {
        "x-youtube-client-name": "1",
        "x-youtube-client-version": "2.20180222",
        "accept-language": "en-US,en;q=0.5",
    },
});
//# sourceMappingURL=api.js.map