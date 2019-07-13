const mongoose = require('mongoose');

const mongoConfig = require('../config/mongo');

class Database {
  constructor() {
    this.mongo();
  }

  mongo() {
    this.mongoConnection = mongoose.connect(process.env.MONGO_URL, mongoConfig);
  }
}

module.exports = new Database();
