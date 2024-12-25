const express = require("express");
const app = express();
app.use(express.json());
require("dotenv").config();

const client = require("./database/database");
const port = process.env.APP_PORT;

client
  .connect()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
    console.log("Connected to database!");
  })
  .catch((error) => {
    console.log("Connection failed", error);
  });
