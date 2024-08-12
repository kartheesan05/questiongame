require('dotenv').config();
const mysql = require("mysql2");


const db = mysql.createConnection({
  host: process.env.DBHOST,
  user: process.env.DBUSER,
  password: process.env.DBPASS,
  database: "internship",
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

  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS questions (
      id INT AUTO_INCREMENT PRIMARY KEY,
      question VARCHAR(255) NOT NULL,
      answer VARCHAR(255) NOT NULL
    );
  `;

  db.query(createTableQuery, (err, result) => {
    if (err) {
      console.error("Error creating table:", err.stack);
      return;
    }
    console.log('Table "questions" exists or was created successfully.');

    // Insert questions into the table
    const questions = [
      { question: "question1?", answer: "answer1" },
      { question: "question2?", answer: "answer2" },
      { question: "question3?", answer: "answer3" },
    ];

    const insertQuery = `
      INSERT INTO questions (question, answer) VALUES (?, ?);
    `;

    questions.forEach((q) => {
      db.query(insertQuery, [q.question, q.answer], (err, result) => {
        if (err) {
          console.error("Error inserting question:", err.stack);
          return;
        }
        console.log(`Question inserted: ${q.question}`);
      });
    });

    // Close the database connection
    db.end((err) => {
      if (err) {
        console.error("Error closing the database connection:", err.stack);
        return;
      }
      console.log("Database connection closed.");
    });
  });
});
