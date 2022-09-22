const mongoose = require("mongoose");
const connectDB = () => {
  mongoose.connect(process.env.DB_URL, { useNewUrlParser: true }, () => {
    console.log("CONNECTED BD !");
  });
};

module.exports = { connectDB };
