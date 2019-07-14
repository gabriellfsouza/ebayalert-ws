const mongoose = require('mongoose');
const {
  superGet, superPost, superPut, superDelete,
} = require('../utils/supertest');
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
    await mongoose.disconnect();
  });

  const route = '/subscriptions';
  const config = {
    email: 'gabriellfsouza@gmail.com',
    interval: 2,
    phrases: ['android', 'macbook air', 'sandisk 16GB'],
  };
  const { email, interval, phrases } = config;

  describe('Create subscription', () => {
    it('should create a new subscription', async () => {
      const response = await superPost(app, route, config);

      expect(!!response.body._id).toBe(true);
      expect(response.body.email).toEqual(config.email);
      expect(response.body.interval).toEqual(config.interval);
      expect([...response.body.phrases]).toEqual([...config.phrases]);
      expect(response.status).toBe(200);
    });

    it('should not create a duplicated subscription', async () => {
      await superPost(app, route, {
        ...config,
        ...{ phrases: ['android', 'sandisk 16GB', 'macbook air'] },
      });
      const response = await superPost(app, route, config);
      expect(response.status).toBe(409);
    });

    it('should not create when phrases array are out of the range', async () => {
      const responses = await Promise.all([
        superPost(app, route, { ...config, ...{ phrases: [] } }),
        superPost(app, route, { ...config, ...{ phrases: ['1', '2', '3', '4'] } }),
      ]);

      responses.forEach((response) => {
        expect(response.status).toBe(400);
      });
    });

    it('should not create without the required parameters', async () => {
      const responses = await Promise.all([
        superPost(app, route, { email, interval }),
        superPost(app, route, { email, phrases }),
        superPost(app, route, { phrases, interval }),
        superPost(app, route, { email }),
        superPost(app, route, { interval }),
        superPost(app, route, { phrases }),
        superPost(app, route, {}),
        superPost(app, route, undefined),
      ]);

      responses.forEach((response) => {
        expect(response.status).toBe(400);
      });
    });

    it('should update a deleted subscription', async () => {
      const { _id } = (await superPost(app, route, config)).body;
      await superDelete(app, `${route}/${_id}`);
      const response = (await superPost(app, route, config)).body;

      expect(_id).toEqual(response._id);
    });
  });

  describe('List subscriptions', () => {
    let id;
    beforeEach(async () => {
      const subscription = await new Subscription(config);
      id = (await subscription.save())._id;
    });

    it('should retrieve subscriptions array', async () => {
      const response = await superGet(app, route);

      expect(response.status).toBe(200);

      expect(response.body[0].email).toBe(config.email);
      expect(response.body[0].interval).toBe(config.interval);
      expect([...response.body[0].phrases]).toEqual([...config.phrases]);
    });

    it('should retrieve a subscription by id', async () => {
      const response = await superGet(app, `${route}/${id}`);

      expect(response.status).toBe(200);
      expect(response.body.email).toEqual(config.email);
      expect(response.body.interval).toEqual(config.interval);
      expect([...response.body.phrases]).toEqual([...config.phrases]);
    });
  });

  describe('Update subscription', () => {
    let id;
    beforeEach(async () => {
      const subscription = await new Subscription(config);
      id = (await subscription.save())._id;
    });

    it('should be update a subscription', async () => {
      const newConfig = {
        email: 'gabriellimasouza@hotmail.com',
        interval: 20,
        phrases: ['1', '2'],
      };
      const response = await superPut(app, `${route}/${id}`, newConfig);

      expect(response.status).toBe(200);
      expect(response.body.email).toBe(newConfig.email);
      expect(response.body.interval).toBe(newConfig.interval);
      expect([...response.body.phrases]).toEqual([...newConfig.phrases]);
    });
  });

  describe('Delete subscription', () => {
    it('should make a logical subscription deletion', async () => {
      const { _id } = (await superPost(app, route, config)).body;
      
      const response = await superDelete(app, `${route}/${_id}`);
      const subscription = await Subscription.findById(_id);

      expect(response.status).toBe(201);
      expect(!!subscription).toBe(true);
      expect(subscription.deleted).toBe(true);
    });
  });
});
