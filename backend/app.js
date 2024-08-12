require("dotenv").config();
const cors = require("cors");
const express = require("express");
const db = require("./database");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/questions", (req, res) => {
  const query = "SELECT * FROM questions";
  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

app.post("/questions", (req, res) => {
  const { question, answer } = req.body;

  if (!question || !answer) {
    return res.status(400).json({ error: "Question and answer are required" });
  }

  const query = "INSERT INTO questions (question, answer) VALUES (?, ?)";
  db.query(query, [question, answer], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ id: results.insertId, question, answer });
  });
});

app.delete("/questions/:id", (req, res) => {
  const { id } = req.params;
  const query = "DELETE FROM questions WHERE id = ?";
  db.query(query, [id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ message: "Question not found" });
    }
    res.json({ message: "Question deleted successfully" });
  });
});

app.patch("/questions/:id", (req, res) => {
  const { id } = req.params;
  const { question, answer } = req.body;

  const query = "UPDATE questions SET question = ?, answer = ? WHERE id = ?";
  db.query(query, [question, answer, id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ message: "Question not found" });
    }
    res.json({ message: "Question updated successfully" });
  });
});

const PORT = process.env.PORT || 80;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
