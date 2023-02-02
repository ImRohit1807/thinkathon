const express = require('express');
const bodyParser = require('body-parser');
const logger = require('./src/middleware/logger');

const app = express();
const PORT = process.env.PORT;

app.use(bodyParser.json());

const models = [
  'auth',
  'user'
];
models.forEach((model) => {
  const routers = require('./src/api/' + model + '/routes/routes.js');
  app.use('/api/' + model, routers);
});

app.listen(PORT, () => logger.info(`App listening on port ${process.env.PORT}`));
