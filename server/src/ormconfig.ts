import { ConnectionOptions } from "typeorm";

export const config: ConnectionOptions = {
  type: "postgres",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: ["build/**/*.entity{.ts,.js}"],
  migrations: ["build/**/*.ts"],
  cli: {
    migrationsDir: "src/migrations",
  },
};
