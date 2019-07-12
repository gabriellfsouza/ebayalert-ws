const mongoose = require('mongoose');

const mongoConfig = require('../config/mongo');

class Database {
  constructor() {
    this.mongo();
  }

  mongo() {
    this.mongoConnection = mongoose.connect(process.env.MONGO_URL, mongoConfig);
  }

  disconnect() {
    return this.mongoConnection.close();
  }
}

module.exports = new Database();
