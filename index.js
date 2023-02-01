const express = require('express');
const bodyParser = require('body-parser');
const db = require('./src/Database/db');

const app = express();
const PORT = 5000;

app.use(bodyParser.json());

const models = [
    "Auth",
    "User",
  ];
  
models.forEach((model) => {
  console.log('model: ' + model)
    let routers = require("./src/api/" + model + "/Routes/routes.js");
    app.use("/api/" + model, routers);
  });

app.listen(PORT, () => console.log(`App listening on port ${PORT}`));