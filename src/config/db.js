import { Sequelize } from "sequelize";

import { config } from "./env.js";

const sequelize = new Sequelize({
  username: config.DB_USER,
  password: config.DB_PASS,
  database: config.DB_NAME,
  host: config.DB_HOST,
  dialect: "postgres",
  define: {
    underscored: true,
  },
  logging: config.APP_ENV === 'local' ?? false
});

export default sequelize;
