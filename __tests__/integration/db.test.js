const mongoose = require('mongoose');
const { isDate } = require('date-fns');

const database = require('../../src/database');
const Subscription = require('../../src/schemas/Subscription');

describe('Database', () => {
  beforeAll(async () => {
    await Subscription.remove();
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  describe('Connection', () => {
    it('should connect to server', async () => {
      const connection = await database.mongoConnection;

      expect(isDate(connection.now())).toBe(true);
    });
  });

  describe('Subscription', () => {
    afterEach(async () => {
      await Subscription.remove();
    });

    it('sould be a module', () => {
      expect(Subscription).toBeDefined();
    });

    it('shoud add a new subscription', async () => {
      const config = {
        email: 'gabriellfsouza@gmai.com',
        interval: 2,
        phrases: ['android', 'macbook air', 'sandisk 16GB'],
      };

      const subscription = new Subscription(config);
      const savedSubcription = await subscription.save();

      const { email, interval, phrases } = savedSubcription;

      console.log(savedSubcription);

      expect(!!savedSubcription._id).toBe(true);

      expect(email).toEqual(config.email);
      expect(interval).toEqual(config.interval);
      expect([...phrases]).toEqual([...config.phrases]);
    });
  });
});
