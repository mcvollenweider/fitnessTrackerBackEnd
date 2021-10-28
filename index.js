// create the express server here
const PORT = 3000;
const express = require("express");
const server = express();
const morgan = require("morgan");
server.use(morgan("dev"));
server.use(express.json());
<<<<<<< HEAD
const { client } = require("./db");
client.connect();
=======


const { client } = require("./db");
client.connect();

>>>>>>> 4a684e4d85c789df32251de49aa41cdc64118766
server.listen(PORT, () => {
  console.log("The server is up on port", PORT);
});