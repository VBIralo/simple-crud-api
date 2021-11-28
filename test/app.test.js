var app = require('../src/app'),
  expect = require('chai').expect,
  request = require('supertest');

let postData = { "name": "Vladilen", "age": 41, "hobbies": ["writing tests)))))"] };
let postData2 = { "name": "Vladilen", "age": 16, "hobbies": ["setting up moves from webpack version 4 to 5 =)"] };
let postData4 = { "name": "Max", "age": 1, "hobbies": [""] };
let postData5 = { "name": "Henry", "age": 20, "hobbies": [] };
let postData6 = { "name": "Robert", "age": 19 };

let expectData = { "id": 1, "name": "Vladilen", "age": 41, "hobbies": ["writing tests)))))"] };
let expectData2 = { "id": 1, "name": "Vladilen", "age": 16, "hobbies": ["setting up moves from webpack version 4 to 5 =)"] };
let expectData3 = { message: "This person doesn't exist." };
let expectData4 = { "id": 2, "name": "Max", "age": 1, "hobbies": [""] };
let expectData5 = { "id": 3, "name": "Henry", "age": 20, "hobbies": [] };
let expectData6 = {
  message: 'The request body must contain the following parameters:\n' +
    '{\n' +
    '  "name": string, \n' +
    '  "age": number, \n' +
    '  "hobbies": array of strings or empty array\n' +
    '}'
};

describe('Сценарий #1', function () {
  it('1. GET-запросом получаем все объекты (ожидается пустой массив)', function (done) {
    request(app)
      .get('/person')
      .expect(200)
      .expect('[]')
      .end(function (err, res) {
        if (err) return done(err);
        done();
      });
  });

  it('2. POST-запросом создается новый объект (ожидается ответ, содержащий свежесозданный объект)', function (done) {
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

  it('3. GET-запросом пытаемся получить созданный объект по его id (ожидается созданный объект)', function (done) {
    request(app)
      .get('/person/1')
      .expect(200)
      .expect(expectData)
      .end(function (err, res) {
        if (err) return done(err);
        done();
      });
  });

  it('4. PUT-запросом пытаемся обновить созданный объект (ожидается ответ, содержащий обновленный объект с тем же id)', function (done) {
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

  it('5. DELETE-запросом удаляем созданный объект по id (ожидается подтверждение успешного удаления)', function (done) {
    request(app)
      .delete('/person/1')
      .expect(204)
      .end(function (err, res) {
        if (err) return done(err);
        done();
      });
  });

  it('6. GET-запросом пытаемся получить удаленный объект по id (ожидается ответ, что такого объекта нет)', function (done) {
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

describe('Сценарий #2', function () {
  it('1. GET-запросом получаем все объекты (ожидается одна удаленная запись, то есть null, и это не баг)', function (done) {
    request(app)
      .get('/person')
      .expect(200)
      .expect('[null]')
      .end(function (err, res) {
        if (err) return done(err);
        done();
      });
  });

  it('2. POST-запросом создается новый объект (ожидается ответ, содержащий свежесозданный объект)', function (done) {
    request(app)
      .post('/person')
      .send(postData4)
      .expect(201)
      .expect(expectData4)
      .end(function (err, res) {
        if (err) return done(err);
        done();
      });
  });

  it('3. POST-запросом создается новый объект (ожидается ответ, содержащий свежесозданный объект)', function (done) {
    request(app)
      .post('/person')
      .send(postData5)
      .expect(201)
      .expect(expectData5)
      .end(function (err, res) {
        if (err) return done(err);
        done();
      });
  });

  it('4. POST-запросом создается новый объект (ожидается ошибка 400)', function (done) {
    request(app)
      .post('/person')
      .send(postData6)
      .expect(400)
      .expect(expectData6)
      .end(function (err, res) {
        if (err) return done(err);
        done();
      });
  });

  it('5. GET-запросом получаем все объекты (ожидается 3 записи)', function (done) {
    request(app)
      .get('/person')
      .expect(200)
      .end(function (err, res) {
        if (err) {
          return done(err);
        }
        expect(res.body).to.have.length(3);
        return done();
      });
  });

  it('6. GET-запросом пытаемся получить несуществующий объект по его id (ожидается ошибка 404)', function (done) {
    request(app)
      .get('/person/99')
      .expect(404)
      .expect({ message: "This person doesn't exist." })
      .end(function (err, res) {
        if (err) return done(err);
        done();
      });
  });

  it('7. GET-запросом пытаемся получить несуществующий объект по его id (ожидается ошибка 400)', function (done) {
    request(app)
      .get('/person/none')
      .expect(400)
      .expect({ message: "The PersonID parameter is invalid." })
      .end(function (err, res) {
        if (err) return done(err);
        done();
      });
  });

  it('8. PUT-запросом пытаемся обновить несуществующий объект (ожидается ошибка 404)', function (done) {
    request(app)
      .put('/person/1999')
      .send(postData2)
      .expect(404)
      .expect({ message: "This person doesn't exist." })
      .end(function (err, res) {
        if (err) return done(err);
        done();
      });
  });

  it('9. DELETE-запросом удаляем несуществующий объект по id (ожидается ошибка 404)', function (done) {
    request(app)
      .delete('/person/1999')
      .expect(404)
      .expect({ message: "This person doesn't exist." })
      .end(function (err, res) {
        if (err) return done(err);
        done();
      });
  });
});

describe('Сценарий #3', function () {
  it('1. GET-запросом получаем все объекты (ожидается три записи из предыдущих сценариев, и первая удаленная null, и это не баг)', function (done) {
    request(app)
      .get('/person')
      .expect(200)
      .expect([null, { "name": "Max", "age": 1, "hobbies": [""], "id": 2 }, { "name": "Henry", "age": 20, "hobbies": [], "id": 3 }])
      .end(function (err, res) {
        if (err) return done(err);
        done();
      });
  });

  it('2. PUT-запросом пытаемся обновить объект (ожидается ответ, содержащий обновленный объект с тем же id)', function (done) {
    request(app)
      .put('/person/3')
      .send({ "name": "Mike", "age": 10, "hobbies": ["sport"] })
      .expect(200)
      .expect({ "name": "Mike", "age": 10, "hobbies": ["sport"], "id": 3 })
      .end(function (err, res) {
        if (err) return done(err);
        done();
      });
  });

  it('3. PUT-запросом пытаемся обновить удаленный объект (ожидается ошибка)', function (done) {
    request(app)
      .put('/person/1')
      .send(postData2)
      .expect(404)
      .expect({ message: "This person doesn't exist." })
      .end(function (err, res) {
        if (err) return done(err);
        done();
      });
  });

  it('4. POST запрос на несуществующий ресурс (ожидается ошибка)', function (done) {
    request(app)
      .post('/non/existing/route')
      .send(postData2)
      .expect(404)
      .expect({ "message": "Route not found. Use only /person or /person/{personID}." })
      .end(function (err, res) {
        if (err) return done(err);
        done();
      });
  });

  it('5. Несуществующий метод (COPY) запроса (ожидается ошибка)', function (done) {
    request(app)
      .copy('/person')
      .expect(404)
      .expect({ "message": "Route not found. Use only /person or /person/{personID}." })
      .end(function (err, res) {
        if (err) return done(err);
        done();
      });
  });

  it('6. PUT-запросом пытаемся обновить только один параметр (ожидается ответ, содержащий обновленный объект с тем же id)', function (done) {
    request(app)
      .put('/person/3')
      .send({ "name": "Mike" })
      .expect(200)
      .expect({ name: 'Mike', age: 10, hobbies: ['sport'], id: 3 })
      .end(function (err, res) {
        if (err) return done(err);
        done();
      });
  });

  it('7. GET-запросом пытаемся получить измненный объект по его id (ожидается измененный объект)', function (done) {
    request(app)
      .get('/person/3')
      .expect(200)
      .expect({ name: 'Mike', age: 10, hobbies: ['sport'], id: 3 })
      .end(function (err, res) {
        if (err) return done(err);
        done();
      });
  });

  it('8. POST-запросом создается новый объект (ожидается ответ, содержащий свежесозданный объект)', function (done) {
    request(app)
      .post('/person')
      .send(postData4)
      .expect(201)
      .expect({ "id": 4, "name": "Max", "age": 1, "hobbies": [""] })
      .end(function (err, res) {
        if (err) return done(err);
        done();
      });
  });

  it('9. POST-запросом создается новый объект (ожидается ответ, содержащий свежесозданный объект)', function (done) {
    request(app)
      .post('/person')
      .send(postData5)
      .expect(201)
      .expect({ "id": 5, "name": "Henry", "age": 20, "hobbies": [] })
      .end(function (err, res) {
        if (err) return done(err);
        done();
      });
  });

  it('10. GET-запросом получаем все объекты (ожидается 3 записи)', function (done) {
    request(app)
      .get('/person')
      .expect(200)
      .end(function (err, res) {
        if (err) {
          return done(err);
        }
        expect(res.body).to.have.length(5);
        return done();
      });
  });

});