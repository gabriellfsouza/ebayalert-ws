const mongoose = require('mongoose');
const { isDate } = require('date-fns');
const database = require('../../src/database');

describe('Connection', () => {
  afterAll(async () => {
    await mongoose.connection.close();
  });

  it('should connect to server', async () => {
    const connection = await database.mongoConnection;

    expect(isDate(connection.now())).toBe(true);
  });
});
