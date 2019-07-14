const routes = require('express').Router();
const SubscriptionController = require('../controllers/SubscriptionController');
const SubscriptionMiddleware = require('../middlewares/SubscriptionMiddleware');

routes.get('/subscriptions', SubscriptionController.index);
routes.get('/subscriptions/:_id', SubscriptionController.index);
routes.post('/subscriptions', [SubscriptionMiddleware.store], SubscriptionController.store);
routes.put('/subscriptions/:_id', [SubscriptionMiddleware.update], SubscriptionController.update);
routes.delete('/subscriptions/:_id', SubscriptionController.delete);

module.exports = routes;
