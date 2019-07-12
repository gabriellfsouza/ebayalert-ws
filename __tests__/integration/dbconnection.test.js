const mongoose = require('mongoose');
const { isDate } = require('date-fns');

const database = require('../../src/database');

describe('Database', () => {
  afterAll(async () => {
    await mongoose.connection.close();
  });

  describe('Connection', () => {
    it('should connect to server', async () => {
      const connection = await database.mongoConnection;

      expect(isDate(connection.now())).toBe(true);
    });
  });
});
