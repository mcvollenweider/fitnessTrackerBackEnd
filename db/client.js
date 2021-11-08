// build and export your unconnected client here
const { Client } = require("pg");
const CONNECTION_STRING =
  //process.env.DATABASE_URL || "postgres://postgres@localhost:5433/fitness-dev"; 
  process.env.DATABASE_URL || "postgres://localhost:5432/fitness-dev"; 
const client = new Client({
  connectionString: CONNECTION_STRING,
    ssl: process.env.NODE_ENV === "production"? {
        rejectUnauthorized: false
    }: undefined,

});

module.exports = client;

// CHANGE LINE 4 WHEN PULLING FROM GITHUB
// \conninfo in psql to get the localhost number