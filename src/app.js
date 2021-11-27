require('dotenv').config();
const http = require('http');
const PORT = process.env.PORT || 3000;

const persons = [{ id: 1, name: 'Vlad' }];

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
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });

    // Do something with it
    req.on("end", function () {
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

  // If no route present
  else {
    res.writeHead(404, { "Content-Type": "application/json" });
    return res.end(JSON.stringify({ message: "Route not found" }));
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