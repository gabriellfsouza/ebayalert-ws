const routes = require('express').Router();
const alert = require('../services/AlertOperations');
const Subscription = require('../schemas/Subscription');

/**
 * Rota utilizada para testes apenas.
 * Deve ser removida assim que possível.
 */
routes.get('/alerts', async (req, res) => {
  const subscriptions = await Subscription.find();
  subscriptions.forEach(async (s) => {
    await alert.sendSubscribedMail(s.email, s.phrases[0]);
  });
  res.status(201).send();
});

module.exports = routes;
