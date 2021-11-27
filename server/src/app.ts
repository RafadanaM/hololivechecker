import express from "express";
import cron from "node-cron";
import morgan from "morgan";
import cors from "cors";
import { Controller } from "./interfaces/controller.interface";
import { errorMiddleware } from "./middlewares/error.middleware";
import { NotFoundMiddleware } from "./middlewares/notfound.middleware";
import { ChannelService } from "./channels/channel.service";

export class App {
  public app: express.Application;

  public port: number;
  public channelService: ChannelService;

  constructor(controllers: Controller[], port: number) {
    this.app = express();
    this.port = port;
    this.channelService = new ChannelService();

    this.initCron();
    this.initMiddlewares();
    this.initControllers(controllers);
    this.initErrorHandling();
    this.initRouteNotFound();
  }

  private initMiddlewares() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(morgan(process.env.NODE_ENV === "dev" ? "dev" : "short"));
    this.app.use(
      cors({
        origin: [process.env.ORIGIN || "localhost:3000"],
        methods: ["GET"],
        credentials: true,
      })
    );
  }

  private initControllers(controllers: Controller[]) {
    controllers.forEach((controller) => {
      this.app.use(`/api${controller.path}`, controller.router);
    });
  }

  private initErrorHandling() {
    this.app.use(errorMiddleware);
  }

  private initRouteNotFound() {
    this.app.use(NotFoundMiddleware);
  }

  private initCron() {
    cron.schedule("*/3 * * * *", () => {
      console.log("Updating Channel Data...");
      this.channelService.updateChannelData();
      console.log("Updating Channel Data Complete!");
    });
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log(`app is listening on port ${this.port}`);
    });
  }
}
