const { Pool } = require("pg");
const { getChannelData } = require("./functions");
const dotenv = require("dotenv");
const axios = require("axios");
const { allGenOld, allGen } = require("./allVtubers");
dotenv.config();
const pool = new Pool({
  user: process.env.DB_USERNAME,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  //remove in local
  ssl: {
    rejectUnauthorized: false,
  },
});

const config = {
  headers: {
    "x-youtube-client-name": "1",
    "x-youtube-client-version": "2.20180222",
    "accept-language": "en-US,en;q=0.5",
  },
};
pool.on("error", (err, client) => {
  console.error("Unexpected error on idle client", err);
  process.exit(-1);
});

(async () => {
  console.log("running database");
  const client = await pool.connect();
  try {
    /* CREATE GENERATION TABLE */
    await client.query(
      "CREATE TABLE IF NOT EXISTS GENERATION(id_generation serial not null primary key, generation_name varchar(255))"
    );

    const generation = await client.query("SELECT * FROM GENERATION");
    if (generation.rowCount === 0) {
      await Promise.all(
        Object.keys(allGen).map(async (gen) => {
          await client.query(
            "INSERT INTO GENERATION (generation_name) VALUES($1)",
            [gen]
          );
        })
      );
    }
    /* CREATE CHANNEL TABLE */
    await client.query(
      `CREATE TABLE IF NOT EXISTS CHANNEL(id serial not null primary key, id_channel varchar(255) not null,
       channel_name varchar(255), avatar varchar(255), thumbnail varchar(255), subscribers varchar(50), live boolean, 
       live_video_thumbnail varchar(255), live_video_title varchar(255), live_video_url varchar(255), watching varchar(100), 
       id_generation integer, foreign key (id_generation) references GENERATION(id_generation) on delete cascade on update cascade) `
    );

    const channel = await client.query("SELECT id_channel from CHANNEL");
    if (channel.rowCount === 0) {
      await Promise.all(
        Object.keys(allGen).map(async (gen, idx) => {
          await Promise.all(
            allGen[gen].map(async (id) => {
              await client.query(
                "INSERT INTO CHANNEL (id_channel, id_generation) VALUES($1,$2)",
                [id, idx + 1]
              );
            })
          );
        })
      );
    }

    //update data
    await Promise.all(
      Object.keys(allGen).map(async (gen, idx) => {
        try {
          await Promise.all(
            allGen[gen].map(async (id) => {
              try {
                const { data } = await axios.get(
                  `https://youtube.com/channel/${id}/`,
                  config
                );

                /* PARSING DATA V2*/
                const regex = /ytInitialData = ({.*}]}}});/gm;
                const finaldata = regex.exec(data)[1];
                const parsed = JSON.parse(finaldata);
                const {
                  channelName,
                  channelAvatar,
                  channelThumbnail,
                  channelSubscribers,
                  isLive,
                  liveThumbnailUrl,
                  liveTitle,
                  liveLink,
                  watching,
                } = getChannelData(parsed, id);
                await client.query(
                  "UPDATE CHANNEL SET channel_name = $1, avatar = $2, thumbnail = $3, subscribers = $4, live = $5, live_video_thumbnail = $6, live_video_title = $7, live_video_url = $8, watching = $9 WHERE id_channel = $10 AND id_generation = $11",
                  [
                    channelName,
                    channelAvatar,
                    channelThumbnail,
                    channelSubscribers,
                    isLive,
                    liveThumbnailUrl,
                    liveTitle,
                    liveLink,
                    watching,
                    id,
                    idx + 1,
                  ]
                );
              } catch (error) {
                console.log(error);
              }
            })
          );
        } catch (error) {
          console.log(error);
        }
      })
    );
  } finally {
    // Make sure to release the client before any error handling,
    // just in case the error handling itself throws an error.
    client.release();
  }
})().catch((err) => console.log(err.stack));

module.exports = pool;
