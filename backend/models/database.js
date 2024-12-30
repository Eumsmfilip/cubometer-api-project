const user = process.env.DB_USER;
const password = process.env.DB_PASSWORD;
const database = process.env.DB_DATABASE;
const host = process.env.DB_HOST;

const { Client } = require("pg");

const client = new Client({
  host: host,
  user: user,
  port: 5432,
  password: password,
  database: database,
});

module.exports = client;
