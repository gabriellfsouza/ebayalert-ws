const { isDate } = require('date-fns');

const mongoose = require('mongoose');
const database = require('../../src/database');

describe('Database', () => {
  afterAll(async () => {
    await mongoose.disconnect();
  });

  describe('Connection', () => {
    it('should connect to server', async () => {
      const connection = await database.mongoConnection;

      expect(isDate(connection.now())).toBe(true);
    });
  });
});
