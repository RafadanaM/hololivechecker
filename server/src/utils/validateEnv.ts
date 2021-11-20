import { cleanEnv, str } from "envalid";

export function validateEnv() {
  cleanEnv(process.env, {
    PORT: str(),
    DB_HOST: str(),
    DB_PORT: str(),
    DB_USER: str(),
    DB_PASSWORD: str(),
    DB_NAME: str(),
    NODE_ENV: str(),
  });
}
