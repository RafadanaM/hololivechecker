import { ConnectionOptions } from "typeorm";

const ormconfig: ConnectionOptions = {
  type: "postgres",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [__dirname + "/**/*.entity{.ts,.js}"],
  migrations: [__dirname + "/migrations/*{.ts,.js}"],
  ssl: process.env.NODE_ENV === "dev" ? undefined : { rejectUnauthorized: false },
  cli: {
    migrationsDir: "src/migrations",
  },
};

export default ormconfig;
