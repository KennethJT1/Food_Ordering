const mongoose = require("mongoose");
const env = require("dotenv").config();

mongoose.connect(process.env.MONGOURI, { useNewUrlParser: true }).then(()=>{
  console.log("Db connected")
}).catch((e) => {
  console.error("Connection error", e.message);
});

const db = mongoose.connection;

module.exports = db;
