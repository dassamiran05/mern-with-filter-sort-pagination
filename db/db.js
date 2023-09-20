const mongoose = require("mongoose");

const connectDb = async () => {
  try {
    const mongoUrl = process.env.MONGO_URL;
    const conn = await mongoose.connect(mongoUrl);
    console.log(`Database server connected ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.log(`Error n mongodb ${error}`);
  }
};

module.exports = { connectDb };
