const routes = require('express').Router();
const subscriptions = require('./subscriptions');

routes.use(subscriptions);

module.exports = routes;
