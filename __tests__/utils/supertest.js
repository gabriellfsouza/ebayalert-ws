const request = require('supertest');

const superPost = (server, route, body) => request(server)
  .post(route)
  .send(body);

const superGet = (server, route) => request(server).get(route);

module.exports = { superPost, superGet };
