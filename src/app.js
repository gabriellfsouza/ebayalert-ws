require('dotenv').config({
  path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env',
});
require('./database');
const Sentry = require('@sentry/node');
const express = require('express');
require('express-async-errors');
const Youch = require('youch');
const routes = require('./routes');
const sentryConfig = require('./config/sentry');

/**
 * Lógica de criação do servidor por classe (auxilia na hora
 *  de montar os testes, sem ter nenhuma porta alocada por exemplo)
 */
class App {
  constructor() {
    this.express = express();

    Sentry.init(sentryConfig);

    this.middlewares();
    this.routes();
    this.exceptionHandler();
  }

  /**
   * Inicialização dos middlewares
   */
  middlewares() {
    this.express.use(Sentry.Handlers.requestHandler());
    this.express.use(express.json());
  }

  routes() {
    this.express.use(routes);
    this.express.use(Sentry.Handlers.errorHandler());
  }

  exceptionHandler() {
    this.express.use(async (err, req, res, next) => {
      if (process.env.NODE_ENV === 'development') {
        const errors = await new Youch(err, req).toJSON();
        return res.status(500).json(errors);
      }
      return res.status(500).json({ error: 'Internal server error' });
    });
  }
}

module.exports = new App().express;
