import express from "express";
import bodyParser from "body-parser";

import { sequelize } from "./models/index.model.js";
import { config } from "./config/env.js";
import router from "./routes/index.route.js";

const app = express();
const PORT = config.APP_PORT || 3000;

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

app.use(router)

sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
});
