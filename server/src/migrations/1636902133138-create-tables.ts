import { Generation } from "../generations/generation.entity";
import { MigrationInterface, QueryRunner } from "typeorm";
import { allGen } from "../allVtubers";
import { Channel } from "../channels/channel.entity";

export class createTables1636902133138 implements MigrationInterface {
  name = "createTables1636902133138";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`START TRANSACTION`);
    await queryRunner.query(
      `CREATE TABLE "generation" ("id_generation" SERIAL NOT NULL, "generation_name" character varying NOT NULL, CONSTRAINT "PK_71906512b8df2f360e63514ae7b" PRIMARY KEY ("id_generation"))`
    );
    await queryRunner.query(
      `CREATE TABLE "channel" ("id" SERIAL NOT NULL, "id_channel" character varying NOT NULL, "channel_name" character varying, "avatar" character varying, "thumbnail" character varying, "subscribers" character varying, "live" boolean DEFAULT false, "live_video_thumbnail" character varying, "live_video_title" character varying, "live_video_url" character varying, "watching" character varying, "generationIdGeneration" integer, CONSTRAINT "PK_590f33ee6ee7d76437acf362e39" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `ALTER TABLE "channel" ADD CONSTRAINT "FK_568de2297971d956df3d481f541" FOREIGN KEY ("generationIdGeneration") REFERENCES "generation"("id_generation") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(`COMMIT TRANSACTION`);

    const genRepository = queryRunner.connection.getRepository(Generation);
    const channelRepository = queryRunner.connection.getRepository(Channel);

    await Promise.all(
      Object.keys(allGen).map(async (generation, idx) => {
        let gen: Generation = await genRepository.save({ id_generation: idx, generation_name: generation });
        await Promise.all(
          allGen[generation as keyof typeof allGen].map(async (channel_id) => {
            await channelRepository.save({ id_channel: channel_id, generation: gen });
          })
        );
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "channel" DROP CONSTRAINT "FK_568de2297971d956df3d481f541"`);
    await queryRunner.query(`DROP TABLE "channel"`);
    await queryRunner.query(`DROP TABLE "generation"`);
  }
}
