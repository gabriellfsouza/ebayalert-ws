const request = require('supertest');

const superPost = (server, route, body) => request(server)
  .post(route)
  .send(body);

const superGet = (server, route) => request(server).get(route);

const superDelete = (server, route) => request(server).delete(route);

const superPut = (server, route, body) => request(server)
  .put(route)
  .send(body);

module.exports = {
  superPost,
  superGet,
  superDelete,
  superPut,
};
