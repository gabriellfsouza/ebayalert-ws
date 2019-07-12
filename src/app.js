const express = require('express');
const routes = require('./routes');

/**
 * Lógica de criação do servidor por classe (auxilia na hora
 *  de montar os testes, sem ter nenhuma porta alocada por exemplo)
 */
class App {
  constructor() {
    this.express = express();

    this.middlewares();
    this.routes();
  }

  /**
   * Inicialização dos middlewares
   */
  middlewares() {
    this.express.use(express.json());
  }

  routes() {
    this.express.use(routes);
  }
}

module.exports = new App().express;
