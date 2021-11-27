import { NextFunction, Request, Response, Router } from "express";
import { Controller } from "../interfaces/controller.interface";
import { ChannelService } from "./channel.service";

export class ChannelController implements Controller {
  public path: string = "/hololive";
  public router: Router;
  public channelService: ChannelService;

  constructor() {
    this.router = Router();
    this.channelService = new ChannelService();
    this.initRoutes();
  }

  private initRoutes(): void {
    this.router.get("", this.getAllChannels);
  }

  private getAllChannels = async (_: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
      const channels = await this.channelService.getAllChannels();
      return res.send(channels);
    } catch (error) {
      console.log(error);
      next(error);
    }
  };
}
