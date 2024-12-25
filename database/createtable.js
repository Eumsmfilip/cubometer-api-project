const client = require("./database");

const createTableQuery = `
  CREATE TABLE IF NOT EXISTS cubometer_api (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    gtin13 VARCHAR(13) NOT NULL,
    length DOUBLE PRECISION,
    width DOUBLE PRECISION,
    height DOUBLE PRECISION,
    weight DOUBLE PRECISION,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );
`;

client.query(createTableQuery, (err, res) => {
  if (err) {
    console.error("Error creating table:", err.message);
  } else {
    console.log("Table created successfully");
  }

  client.end();
});
