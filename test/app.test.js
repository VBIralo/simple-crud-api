var app = require('../src/app'),
  chai = require('chai'),
  request = require('supertest');

let postData = { "name": "Vladilen", "age": 41, "hobbies": ["writing tests)))))"] };
let postData2 = { "name": "Vladilen", "age": 16, "hobbies": ["setting up moves from webpack version 4 to 5 =)"] };

let expectData = { "id": 1, "name": "Vladilen", "age": 41, "hobbies": ["writing tests)))))"] };
let expectData2 = { "id": 1, "name": "Vladilen", "age": 16, "hobbies": ["setting up moves from webpack version 4 to 5 =)"] };
let expectData3 = { message: "This person doesn't exist." };

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

describe('POST /person', function () {
  it('ожидается ответ, содержащий свежесозданный объект', function (done) {
    request(app)
      .post('/person')
      .send(postData)
      .expect(201)
      .expect(expectData)
      .end(function (err, res) {
        if (err) return done(err);
        done();
      });
  });
});

describe('GET /person/1', function () {
  it('ожидается созданный объект', function (done) {
    request(app)
      .get('/person/1')
      .expect(200)
      .expect(expectData)
      .end(function (err, res) {
        if (err) return done(err);
        done();
      });
  });
});

describe('PUT /person/1', function () {
  it('ожидается ответ, содержащий обновленный объект с тем же id', function (done) {
    request(app)
      .put('/person/1')
      .send(postData2)
      .expect(200)
      .expect(expectData2)
      .end(function (err, res) {
        if (err) return done(err);
        done();
      });
  });
});

describe('DELETE /person/1', function () {
  it('ожидается подтверждение успешного удаления', function (done) {
    request(app)
      .delete('/person/1')
      .expect(204)
      .end(function (err, res) {
        if (err) return done(err);
        done();
      });
  });
});

describe('GET /person/1', function () {
  it('ожидается ответ, что такого объекта нет', function (done) {
    request(app)
      .get('/person/1')
      .expect(404)
      .expect(expectData3)
      .end(function (err, res) {
        if (err) return done(err);
        done();
      });
  });
});