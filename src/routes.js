const routes = require('express').Router();

routes.get('/subscriptions', async (req, res) => res.status(200).json([
  {
    email: 'gabriellfsouza@gmail.com',
    interval: 2,
    phrases: ['android', 'macbook air', 'sandisk 16GB'],
  },
]));

routes.post('/subscriptions', async (req, res) => res.status(201).send());

module.exports = routes;
