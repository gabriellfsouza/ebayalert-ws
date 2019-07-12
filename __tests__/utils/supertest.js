const request = require('supertest');

const superPost = (server, route, body) => request(server)
  .post(route)
  .send(body);

module.exports = { superPost };
