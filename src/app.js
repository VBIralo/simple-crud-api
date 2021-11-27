require('dotenv').config();
const http = require('http');
const PORT = process.env.PORT || 3000;

const persons = [
  {
    "name": "Max",
    "age": 4,
    "hobbies": [],
    "id": 1
  }, {
    "name": "Eva",
    "age": 4,
    "hobbies": [],
    "id": 2
  },
  {
    "name": "Vladislav",
    "age": 4,
    "hobbies": [],
    "id": 3
  },
  {
    "name": "Tanya",
    "age": 4,
    "hobbies": [],
    "id": 4
  }
];

const server = http.createServer((req, res) => {
  console.log(req.url)
  //GET person
  if (req.url === "/person" && req.method === "GET") {
    res.writeHead(200, { "Content-Type": "application/json" });
    return res.end(JSON.stringify(persons));
  }

  //GET person/{personId}
  if (req.url.match(/^\/person\/(.+)/) && req.method === "GET") {
    let personId = +req.url.match(/^\/person\/(.+)/)[1];
    let person = persons.find(x => x.id === personId);

    if (!personId) {
      res.writeHead(400, { "Content-Type": "application/json" });
      return res.end(JSON.stringify({ message: "The PersonID parameter is invalid." }));
    }

    if (person) {
      res.writeHead(200, { "Content-Type": "application/json" });
      return res.end(JSON.stringify(person));
    } else {
      res.writeHead(404, { "Content-Type": "application/json" });
      return res.end(JSON.stringify({ message: "This person doesn't exist." }));
    }
  }

  //POST person
  if (req.url === "/person" && req.method === "POST") {
    let body = "";
    req.on("data", chunk => {
      body += chunk.toString();
    });

    return req.on("end", function () {
      let { name, age, hobbies } = JSON.parse(body);

      if (typeof (name) == 'string' && typeof (age) == 'number' && !!hobbies) {
        res.writeHead(201, { "Content-Type": "application/json" });
        return res.end(JSON.stringify(CreatePerson(name, age, hobbies)));
      } else {
        res.writeHead(400, { "Content-Type": "application/json" });
        return res.end(JSON.stringify({
          message: `The request body must contain the following parameters:
{
  "name": string, 
  "age": number, 
  "hobbies": array of strings or empty array
}` }));
      }
    });
  }

  //PUT person/{personId}
  if (req.url.match(/^\/person\/(.+)/) && req.method === "PUT") {
    let personId = +req.url.match(/^\/person\/(.+)/)[1];
    let person = persons.find(x => x.id === personId);
    let body = "";
    req.on("data", chunk => {
      body += chunk.toString();
    });

    return req.on("end", function () {
      let { name, age, hobbies } = JSON.parse(body);

      if (!personId) {
        res.writeHead(400, { "Content-Type": "application/json" });
        return res.end(JSON.stringify({ message: "The PersonID parameter is invalid." }));
      }

      if (person) {
        res.writeHead(200, { "Content-Type": "application/json" });
        return res.end(JSON.stringify(UpdatePerson(personId, name, age, hobbies)));
      } else {
        res.writeHead(404, { "Content-Type": "application/json" });
        return res.end(JSON.stringify({ message: "This person doesn't exist." }));
      }
    });
  }

  //DELETE person/{personId}
  if (req.url.match(/^\/person\/(.+)/) && req.method === "DELETE") {
    let personId = +req.url.match(/^\/person\/(.+)/)[1];
    let personIndex = persons.findIndex(x => x.id === personId);


    if (!personId) {
      res.writeHead(400, { "Content-Type": "application/json" });
      return res.end(JSON.stringify({ message: "The PersonID parameter is invalid." }));
    }

    if (personIndex) {
      res.writeHead(204, { "Content-Type": "application/json" });
      delete persons[personIndex];
      console.log(persons);
      return res.end();
    } else {
      res.writeHead(404, { "Content-Type": "application/json" });
      return res.end(JSON.stringify({ message: "This person doesn't exist." }));
    }
  }

  // If no route present
  else {
    res.writeHead(404, { "Content-Type": "application/json" });
    return res.end(JSON.stringify({ message: "Route not found. Use only /person or /person/{personID}." }));
  }
});

server.listen(PORT, () => {
  console.log(`server started on port: ${PORT}`);
});

CreatePerson = (name, age, hobbies) => {

  let uid = persons.length + 1;
  let person = {
    name,
    age,
    hobbies,
    id: uid
  };

  persons.push(person);

  return person;
}

UpdatePerson = (id, name, age, hobbies) => {
  let personId = persons.findIndex(x => x.id === id);

  if (name !== undefined) persons[personId].name = name;
  if (age !== undefined) persons[personId].age = age;
  if (hobbies !== undefined) persons[personId].hobbies = hobbies;

  return persons[personId];
}