const { Pool } = require("pg");
const dotenv = require("dotenv");
dotenv.config();
const pool = new Pool({
  user: process.env.DB_USERNAME,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  //remove in local
});

const { allGenOld, allGen } = require("./allVtubers");

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
  } finally {
    // Make sure to release the client before any error handling,
    // just in case the error handling itself throws an error.
    client.release();
  }
})().catch((err) => console.log(err.stack));

module.exports = pool;
