import "dotenv/config";
import { createConnection } from "typeorm";
import { App } from "./app";
import { ChannelController } from "./channels/channel.controller";
import config from "./ormconfig";
import { validateEnv } from "./utils/validateEnv";

validateEnv();
(async () => {
  try {
    const connection = await createConnection(config);
  } catch (error) {
    console.log("Error connecting to the database", error);
    return error;
  }

  const app = new App([new ChannelController()], parseInt(process.env.port || "5000"));

  app.listen();
})();
