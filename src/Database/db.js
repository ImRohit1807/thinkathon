var mongoose = require("mongoose");
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
  console.error("Error occured in db connection");
});

conn.on("open", () => {
  console.log("DB Connection established succesfully");
});

module.exports = mongoose;
