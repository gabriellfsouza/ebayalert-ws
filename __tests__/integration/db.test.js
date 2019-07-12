const database = require('../../src/database');

describe('Connection', () => {
  it('should connect to server', async () => {
    const connection = await database.mongoConnection;

    expect(!!connection).toBe(true);
  });
});
