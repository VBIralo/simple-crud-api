var app = require('../src/app'),
  chai = require('chai'),
  request = require('supertest');


describe('GET /person', function () {
  it('ожидается пустой массив', function (done) {
    request(app)
      .get('/person')
      .expect(200)
      .expect('[]')
      .end(function (err, res) {
        if (err) return done(err);
        done();
      });
  });
});