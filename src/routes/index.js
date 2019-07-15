const routes = require('express').Router();
const subscriptions = require('./subscriptions');
const alerts = require('./alerts');

routes.use(subscriptions);
routes.use(alerts);

module.exports = routes;
