const express = require("express");
const app = express();

require("dotenv").config();

const port = process.env.APP_PORT;
const client = require("./models/database");
const db = require("./models");
const router = require("./routes/product.route");

app.use(express.json());
app.use("/api/products", router);

client
  .connect()
  .then(() => {
    db.sequelize.sync().then((req) => {
      app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
      });
    });
    console.log("Connected to database!");
  })
  .catch((error) => {
    console.log("Connection failed", error);
  });
