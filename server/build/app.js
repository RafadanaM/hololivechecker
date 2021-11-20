"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
const express_1 = __importDefault(require("express"));
const node_cron_1 = __importDefault(require("node-cron"));
const morgan_1 = __importDefault(require("morgan"));
const error_middleware_1 = require("./middlewares/error.middleware");
const notfound_middleware_1 = require("./middlewares/notfound.middleware");
const channel_service_1 = require("./channels/channel.service");
class App {
    constructor(controllers, port) {
        this.app = (0, express_1.default)();
        this.port = port;
        this.channelService = new channel_service_1.ChannelService();
        this.initCron();
        this.initMiddlewares();
        this.initControllers(controllers);
        this.initErrorHandling();
        this.initRouteNotFound();
    }
    initMiddlewares() {
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: true }));
        this.app.use((0, morgan_1.default)(process.env.NODE_ENV === "dev" ? "dev" : "short"));
    }
    initControllers(controllers) {
        controllers.forEach((controller) => {
            this.app.use(`/api${controller.path}`, controller.router);
        });
    }
    initErrorHandling() {
        this.app.use(error_middleware_1.errorMiddleware);
    }
    initRouteNotFound() {
        this.app.use(notfound_middleware_1.NotFoundMiddleware);
    }
    initCron() {
        node_cron_1.default.schedule("*/3 * * * *", () => {
            console.log("Updating Channel Data...");
            this.channelService.updateChannelData();
            console.log("Updating Channel Data Complete!");
        });
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log(`app is listening on port ${this.port}`);
        });
    }
}
exports.App = App;
//# sourceMappingURL=app.js.map