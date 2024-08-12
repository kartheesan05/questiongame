require('dotenv').config()
const mysql = require("mysql2");

const db = mysql.createConnection({
  host: process.env.DBHOST,
  user: process.env.DBUSER,
  password: process.env.DBPASS,
  database: 'internship',
  port: 14495,
  ssl: {
    ca: process.env.DBCERT,
  },
});


db.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err.stack);
    return;
  }
  console.log("Connected to the database as ID", db.threadId);
});

module.exports = db;
