require('dotenv').config();
const http = require('http');
const PORT = process.env.PORT || 3000;

const persons = [];

const server = http.createServer((req, res) => {
  //GET person
  if (req.url === "/person" && req.method === "GET") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(persons));
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