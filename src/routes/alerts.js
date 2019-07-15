const routes = require('express').Router();
// const alert = require('../services/AlertOperations');
const queue = require('../utils/Queue');
const Subscription = require('../schemas/Subscription');
const AlertJob = require('../jobs/AlertJob');
/**
 * Rota utilizada para testes apenas.
 * Deve ser removida assim que possível.
 */
routes.get('/alerts', async (req, res) => {
  const subscriptions = await Subscription.find();
  subscriptions.forEach(async (s) => {
    // await alert.sendSubscribedMail(s.email, s.phrases[0]);
    const { email } = s;
    const phrase = s.phrases[0];
    queue.add(AlertJob.key, {
      email,
      phrase,
    });
  });
  res.status(201).send();
});

module.exports = routes;
