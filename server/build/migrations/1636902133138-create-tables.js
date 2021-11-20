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
exports.createTables1636902133138 = void 0;
const generation_entity_1 = require("../generations/generation.entity");
const allVtubers_1 = require("../allVtubers");
const channel_entity_1 = require("../channels/channel.entity");
class createTables1636902133138 {
    constructor() {
        this.name = "createTables1636902133138";
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`START TRANSACTION`);
            yield queryRunner.query(`CREATE TABLE "generation" ("id_generation" SERIAL NOT NULL, "generation_name" character varying NOT NULL, CONSTRAINT "PK_71906512b8df2f360e63514ae7b" PRIMARY KEY ("id_generation"))`);
            yield queryRunner.query(`CREATE TABLE "channel" ("id" SERIAL NOT NULL, "id_channel" character varying NOT NULL, "channel_name" character varying, "avatar" character varying, "thumbnail" character varying, "subscribers" character varying, "live" boolean DEFAULT false, "live_video_thumbnail" character varying, "live_video_title" character varying, "live_video_url" character varying, "watching" character varying, "generationIdGeneration" integer, CONSTRAINT "PK_590f33ee6ee7d76437acf362e39" PRIMARY KEY ("id"))`);
            yield queryRunner.query(`ALTER TABLE "channel" ADD CONSTRAINT "FK_568de2297971d956df3d481f541" FOREIGN KEY ("generationIdGeneration") REFERENCES "generation"("id_generation") ON DELETE NO ACTION ON UPDATE NO ACTION`);
            yield queryRunner.query(`COMMIT TRANSACTION`);
            const genRepository = queryRunner.connection.getRepository(generation_entity_1.Generation);
            const channelRepository = queryRunner.connection.getRepository(channel_entity_1.Channel);
            yield Promise.all(Object.keys(allVtubers_1.allGen).map((generation, idx) => __awaiter(this, void 0, void 0, function* () {
                let gen = yield genRepository.save({ id_generation: idx, generation_name: generation });
                yield Promise.all(allVtubers_1.allGen[generation].map((channel_id) => __awaiter(this, void 0, void 0, function* () {
                    yield channelRepository.save({ id_channel: channel_id, generation: gen });
                })));
            })));
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "channel" DROP CONSTRAINT "FK_568de2297971d956df3d481f541"`);
            yield queryRunner.query(`DROP TABLE "channel"`);
            yield queryRunner.query(`DROP TABLE "generation"`);
        });
    }
}
exports.createTables1636902133138 = createTables1636902133138;
//# sourceMappingURL=1636902133138-create-tables.js.map