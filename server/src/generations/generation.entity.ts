import { Channel } from "../channels/channel.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Generation {
  @PrimaryGeneratedColumn()
  public id_generation?: number;

  @Column()
  public generation_name: string;

  @OneToMany(() => Channel, (channel: Channel) => channel.id, { onDelete: "CASCADE" })
  public channels: Channel[];
}
