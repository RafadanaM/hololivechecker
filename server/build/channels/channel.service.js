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
exports.ChannelService = void 0;
const api_1 = require("../axios/api");
const getChannelData_1 = require("../utils/getChannelData");
const regex_1 = require("../utils/regex");
const typeorm_1 = require("typeorm");
const channel_entity_1 = require("./channel.entity");
class ChannelService {
    constructor() {
        this.channelRepository = (0, typeorm_1.getRepository)(channel_entity_1.Channel);
    }
    updateChannelData() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const channels = yield this.channelRepository.find();
                channels.forEach((channel) => __awaiter(this, void 0, void 0, function* () {
                    const { data } = yield api_1.api.get(channel.id_channel);
                    const result = regex_1.regex.exec(data);
                    if (result && channel.id) {
                        const finalData = result[1];
                        const parsedData = JSON.parse(finalData);
                        const channelData = (0, getChannelData_1.getChannelData)(parsedData, channel.id_channel);
                        yield this.channelRepository.update(channel.id, channelData);
                    }
                }));
            }
            catch (error) {
                console.log(error);
                throw new Error(error);
            }
        });
    }
}
exports.ChannelService = ChannelService;
//# sourceMappingURL=channel.service.js.map