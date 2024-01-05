const express = require("express");
const app = express();
const cors = require('cors');
require('dotenv').config(); // Cargar variables de entorno desde el archivo .env
const sequelize = require("./config/database");


const routes = require("./routes");

app.use(cors());

app.use(express.json());

app.use("/api", routes);


sequelize.sync().then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Servidor en http://localhost:` + process.env.PORT);
    });
  });