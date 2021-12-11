import { api } from "../axios/api";
import { getChannelData } from "../utils/getChannelData";
import { regex } from "../utils/regex";
import { getRepository, Repository } from "typeorm";
import { Channel } from "./channel.entity";
import { HttpException } from "../exceptions/HttpException";

export class ChannelService {
  private channelRepository: Repository<Channel> = getRepository(Channel);

  public async updateChannelData() {
    try {
      const channels = await this.channelRepository.find();
      channels.forEach(async (channel) => {
        const { data } = await api.get(channel.id_channel);
        const result = regex.exec(data);
        console.log(channel);
        const finalData = result[1];
        const parsedData = JSON.parse(finalData);
        const channelData = getChannelData(parsedData, channel.id_channel);
        await this.channelRepository.update(channel.id, channelData);
        
        
      });
    } catch (error) {
      console.log("############################################");
      console.log(error);
      throw new Error(error);
    }
  }

  public async getAllChannels() {
    const channels = await this.channelRepository.find({ relations: ["generation"], order: { generation: "ASC" } });
    /* Source = https://stackoverflow.com/questions/40774697/how-to-group-an-array-of-objects-by-key/40774759#40774759 */
    const data = channels.reduce((r, a) => {
      r[a.generation.generation_name] = r[a.generation.generation_name] || [];
      r[a.generation.generation_name].push(a);
      return r;
    }, Object.create(null));

    return data;
  }
}
