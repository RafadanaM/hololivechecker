const { Pool } = require("pg");
const dotenv = require("dotenv");
dotenv.config();
const pool = new Pool({
  user: process.env.DB_USERNAME,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

const { allGenOld } = require("./allVtubers");

pool.on("error", (err, client) => {
  console.error("Unexpected error on idle client", err);
  process.exit(-1);
});

pool.connect((err, client, release) => {
  try {
    console.log("running database");
    pool.query(
      "CREATE TABLE IF NOT EXISTS CHANNEL(id_channel varchar(255) not null primary key, channel_name varchar(255), avatar varchar(255), thumbnail varchar(255), subscribers varchar(50), live boolean, live_video_thumbnail varchar(255), live_video_title varchar(255), live_video_url varchar(255), watching varchar(50))",
      async (err, result) => {
        const test = await pool.query("SELECT id_channel from CHANNEL");
        if (test.rowCount === 0) {
          await Promise.all(
            allGenOld.map((id) => {
              try {
                pool.query("INSERT INTO CHANNEL (id_channel) VALUES ($1)", [
                  id,
                ]);
              } catch (error) {}
            })
          );
        }
      }
    );

    release();
  } catch (error) {
    throw error;
  }
});

module.exports = {
  query: (text, params) =>
    pool.query(text, params).catch((err) => console.log(err)),
};
