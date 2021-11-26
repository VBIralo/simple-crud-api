require('dotenv').config();
const http = require('http');
const PORT = process.env.PORT || 3000;

const persons = [{ id: 1, name: 'Vlad' }];

const server = http.createServer((req, res) => {
  console.log(req.url)
  //GET person
  if (req.url === "/person" && req.method === "GET") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(persons));
  }

  if (req.url.match(/^\/person\/(.+)/) && req.method === "GET") {
    let personId = +req.url.match(/^\/person\/(.+)/)[1];
    let person = persons.find(x => x.id === personId);

    if (!personId) {
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "The PersonID parameter is invalid." }));
    }

    if (person) {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(person));
    } else {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "This person doesn't exist." }));
    }
  }

  // If no route present
  else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Route not found" }));
  }
});

server.listen(PORT, () => {
  console.log(`server started on port: ${PORT}`);
});