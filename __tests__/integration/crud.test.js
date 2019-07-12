const { superPost, superGet } = require('../utils/supertest');
const database = require('../../src/database');

const app = require('../../src/app');
const Subscription = require('../../src/schemas/Subscription');

describe('CRUD Operations over the subscriptions list routes.', () => {
  beforeAll(async () => {
    await database.mongoConnection;
    await Subscription.remove();
  });

  afterEach(async () => {
    await Subscription.remove();
  });

  afterAll(async () => {
    await database.disconnect();
  });

  const config = {
    email: 'gabriellfsouza@gmail.com',
    interval: 2,
    phrases: ['android', 'macbook air', 'sandisk 16GB'],
  };
  const { email, interval, phrases } = config;

  describe('Create subscription', () => {
    const route = '/subscriptions';

    it('should create a new subscription', async () => {
      const response = await superPost(app, route, config);

      expect(response.status).toBe(201);
    });

    // it('should not create a duplicated subscription', async () => {
    //   await superPost(app, route, config);
    //   const response = await superPost(app, route, config);
    //   expect(response.status).toBe(409);
    // });

    // it('should not create when phrases array are out of the range', async () => {
    //   const responses = await Promise.all(
    //     superPost(app, route, { ...config, ...{ phrases: [] } }),
    //     superPost(app, route, { ...config, ...{ phrases: ['1', '2', '3', '4'] } }),
    //   );

    //   responses.forEach((response) => {
    //     expect(response.status).toBe(400);
    //   });
    // });

    // it('should not create without the required parameters', async () => {
    //   const responses = await Promise.all(
    //     superPost(app, route, { email, interval }),
    //     superPost(app, route, { email, phrases }),
    //     superPost(app, route, { phrases, interval }),
    //     superPost(app, route, { email }),
    //     superPost(app, route, { interval }),
    //     superPost(app, route, { phrases }),
    //     superPost(app, route, {}),
    //     superPost(app, route, undefined),
    //   );

    //   responses.forEach((response) => {
    //     expect(response.status).toBe(400);
    //   });
    // });
  });

  describe('List subscriptions', () => {
    const route = '/subscriptions';
    beforeEach(async () => {
      const subscription = await new Subscription(config);
      await subscription.save();
    });

    it('should retrieve subscriptions array', async () => {
      const response = await superGet(app, route);

      expect(response.status).toBe(200);

      expect(response.body[0].email).toEqual(config.email);
      expect(response.body[0].interval).toEqual(config.interval);
      expect([...response.body[0].phrases]).toEqual([...config.phrases]);
    });
  });
});
