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
    const config = {
      email: 'gabriellfsouza@gmail.com',
      interval: 2,
      phrases: ['android', 'macbook air', 'sandisk 16GB'],
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
        _id, email, interval, phrases,
      } = await subscription.save();

      expect(!!_id).toBe(true);

      expect(email).toEqual(config.email);
      expect(interval).toEqual(config.interval);
      expect([...phrases]).toEqual([...config.phrases]);
    });

    it('should not add more than 3 phrases', async () => {
      const phrases = [...config.phrases, 'fourth element'];
      const subscription = new Subscription({ ...config, phrases });
      let subscriptionSaved = {};
      try {
        subscriptionSaved = await subscription.save();
      } catch (error) {
        expect(error.errors.phrases.message).toEqual('size is out of range or empty');
      }

      const { _id } = subscriptionSaved;

      expect(!!_id).toBe(false);
    });

    it('should not add a subscription without phrases', async () => {
      const phrases = [];
      const subscription = new Subscription({ ...config, phrases });
      let subscriptionSaved = {};
      try {
        subscriptionSaved = await subscription.save();
      } catch (error) {
        expect(error.errors.phrases.message).toEqual('size is out of range or empty');
      }

      const { _id } = subscriptionSaved;

      expect(!!_id).toBe(false);
    });
  });
});
