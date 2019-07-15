const mongoose = require('mongoose');
const Subscription = require('../../src/schemas/Subscription');
const database = require('../../src/database');

describe('Database', () => {
  beforeAll(async () => {
    await database.mongoConnection;
    await Subscription.remove();
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  describe('Subscription', () => {
    const config = {
      email: 'gabriellfsouza@gmail.com',
      interval: 2,
      phrase: 'android',
    };

    afterEach(async () => {
      await Subscription.remove();
    });

    it('sould be a module', () => {
      expect(Subscription).toBeDefined();
    });

    it('shoud add a new subscription', async () => {
      const subscription = new Subscription(config);
      const {
        _id, email, interval, phrase,
      } = await subscription.save();

      expect(!!_id).toBe(true);

      expect(email).toBe(config.email);
      expect(interval).toBe(config.interval);
      expect(phrase).toBe(config.phrase);
    });
  });
});
