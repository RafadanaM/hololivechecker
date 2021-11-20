import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Generation } from "../generations/generation.entity";
@Entity()
export class Channel {
  @PrimaryGeneratedColumn()
  public id?: number;

  @Column()
  public id_channel: string;

  @Column({
    nullable: true,
  })
  public channel_name: string;

  @Column({
    nullable: true,
  })
  public avatar: string;

  @Column({
    nullable: true,
  })
  public thumbnail: string;

  @Column({
    nullable: true,
  })
  public subscribers: string;

  @Column({
    nullable: true,
    default: false,
  })
  public live: boolean;

  @Column({
    nullable: true,
  })
  public live_video_thumbnail: string;

  @Column({
    nullable: true,
  })
  public live_video_title: string;

  @Column({
    nullable: true,
  })
  public live_video_url: string;

  @Column({
    nullable: true,
  })
  public watching: string;

  @ManyToOne(() => Generation, (generation: Generation) => generation.id_generation)
  public generation: Generation;
}
