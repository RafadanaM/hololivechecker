import { api } from "../axios/api";
import { getChannelData } from "../utils/getChannelData";
import { regex } from "../utils/regex";
import { getRepository, Repository } from "typeorm";
import { Channel } from "./channel.entity";

export class ChannelService {
  private channelRepository: Repository<Channel> = getRepository(Channel);

  public async updateChannelData() {
    try {
      const channels = await this.channelRepository.find();
      channels.forEach(async (channel) => {
        const { data } = await api.get(channel.id_channel);
        const result = regex.exec(data);
        if (result && channel.id) {
          const finalData = result[1];
          const parsedData = JSON.parse(finalData);
          const channelData = getChannelData(parsedData, channel.id_channel);
          await this.channelRepository.update(channel.id, channelData);
        }
      });
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }
}
