require('dotenv').config();
const server = require("./src/app");
const PORT = process.env.PORT || 3000;

console.log(`server started on port: ${PORT}`);

server.listen(PORT);