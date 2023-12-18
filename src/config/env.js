import "dotenv/config";

export const config = {
  FE_URL: process.env.FE_URL,
  APP_ENV: process.env.APP_ENV,
  APP_PORT: process.env.APP_PORT,
  DB_HOST: process.env.DB_HOST,
  DB_PORT: process.env.DB_PORT,
  DB_USER: process.env.DB_USER,
  DB_NAME: process.env.DB_NAME,
  DB_PASS: process.env.DB_PASS,
  SECRET: process.env.SECRET,
  REFRESH: process.env.REFRESH,
  EXP: process.env.EXP,
  REFRESH_EXP: process.env.REFRESH_EXP,
};
