var mongoose = require("mongoose");
const logger = require('../middleware/logger')

require("dotenv").config();

mongoose.set('strictQuery', false)

// Connection establishment
mongoose.connect(process.env.DB_URL, {
  useNewUrlParser: true,
  autoIndex: true,
  useUnifiedTopology: true,
});

var conn = mongoose.connection;

conn.on("error", () => {
  logger.error("Error occured in db connection");
});

conn.on("open", () => {
  logger.info("DB Connection established succesfully");
});

module.exports = mongoose;
