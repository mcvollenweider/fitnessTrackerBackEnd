// build and export your unconnected client here
const { Client } = require("pg");
<<<<<<< HEAD
const CONNECTION_STRING =
  process.env.DATABASE_URL || "postgres://localhost:3000/fitness-dev";
const client = new Client({
  connectionString: CONNECTION_STRING,
});
=======

const CONNECTION_STRING =
  process.env.DATABASE_URL || "postgres://localhost:5432/fitness-dev";


const client = new Client({
  connectionString: CONNECTION_STRING,
});

>>>>>>> 4a684e4d85c789df32251de49aa41cdc64118766
module.exports = client;

