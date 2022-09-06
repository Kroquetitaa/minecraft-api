const dotenv = require('dotenv').config();
const mongoose = require('mongoose');
const mongoDB = process.env.MONGO_DB;

const connectDB = async () => {
  try {
    const db = await mongoose.connect(mongoDB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    const { name, host } = db.connection;
    console.log(`Database connected to 👀: ${name} in host ❤️: ${host}`);
  } catch (error) {
    console.error(`Failed to connect Database ❤️ ${error}`);
  }
};

module.exports = { connectDB };