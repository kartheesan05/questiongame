import "./App.scss";
import QuestionCard from "./components/QuestionCard";
import { useState, useEffect } from "react";
import {
  fetchQuestions,
  addQuestion,
  updateQuestion,
  deleteQuestion,
} from "./utilfolder/utils"; // Import functions

const Admin = () => {
  const [questions, setQuestions] = useState([]);
  const [index, setIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isAdding, setIsAdding] = useState(false); // State to show/hide add form
  const [newQuestion, setNewQuestion] = useState({ question: "", answer: "" });
  const [isEditing, setIsEditing] = useState(false); // State to show/hide edit form
  const [editingQuestion, setEditingQuestion] = useState({
    question: "",
    answer: "",
  });

  useEffect(() => {
    const loadQuestions = async () => {
      try {
        const data = await fetchQuestions();
        setQuestions(data);
      } catch (error) {
        console.error("Error loading questions:", error);
      }
    };

    loadQuestions();
  }, []);

  useEffect(() => {
    if (isEditing && questions.length > 0) {
      const currentQuestion = questions[index];
      setEditingQuestion({
        question: currentQuestion.question,
        answer: currentQuestion.answer,
      });
    }
  }, [isEditing, index, questions]);

  const handleClick = (add) => {
    setIsFlipped(false);
    if (add) {
      setIndex((prev) => Math.min(prev + 1, questions.length - 1));
    } else {
      setIndex((prev) => Math.max(prev - 1, 0));
    }
  };

  const handleFlip = () => {
    setIsFlipped((prev) => !prev);
  };

  const handleAddQuestion = async () => {
    try {
      const result = await addQuestion(newQuestion);
      setQuestions([...questions, result]);
      setNewQuestion({ question: "", answer: "" }); // Reset form
      setIsAdding(false); // Hide form after adding
    } catch (error) {
      console.error("Error adding question:", error);
    }
  };

  const handleUpdateQuestion = async () => {
    if (!editingQuestion.question || !editingQuestion.answer) {
      return; // Ensure no empty updates
    }
    try {
      const currentQuestion = questions[index];
      const result = await updateQuestion(currentQuestion.id, editingQuestion);
      setQuestions(
        questions.map((q) =>
          q.id === currentQuestion.id ? { ...q, ...editingQuestion } : q
        )
      );
      setIsEditing(false); // Hide form after updating
    } catch (error) {
      console.error("Error updating question:", error);
    }
  };

  const handleDeleteQuestion = async () => {
    if (questions.length === 0) return;

    try {
      const currentQuestion = questions[index];
      await deleteQuestion(currentQuestion.id);
      setQuestions(questions.filter((q) => q.id !== currentQuestion.id));
      setIndex(0); // Reset index after deletion
    } catch (error) {
      console.error("Error deleting question:", error);
    }
  };

  return (
    <>
      <div className="maincontainer">
        <h1>Admin Page</h1>
        {questions.length > 0 ? (
          <QuestionCard
            isFlipped={isFlipped}
            question={questions[index].question}
            answer={questions[index].answer}
            handleFlip={handleFlip}
          />
        ) : (
          <p>Loading questions...</p>
        )}
        <div className="buttons">
          {index > 0 && (
            <button onClick={() => handleClick(false)}>Previous</button>
          )}
          {index < questions.length - 1 && (
            <button onClick={() => handleClick(true)}>Next</button>
          )}
        </div>

        <button id="addbutton" onClick={() => setIsAdding(!isAdding)}>
          {isAdding ? "Cancel" : "Add New Question"}
        </button>

        {isAdding && (
          <div className="add-form">
            <h2>Add New Question</h2>
            <input
              type="text"
              placeholder="Question"
              value={newQuestion.question}
              onChange={(e) =>
                setNewQuestion({ ...newQuestion, question: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Answer"
              value={newQuestion.answer}
              onChange={(e) =>
                setNewQuestion({ ...newQuestion, answer: e.target.value })
              }
            />
            <button id="addbutton" onClick={handleAddQuestion}>
              Add Question
            </button>
          </div>
        )}

        {questions.length > 0 && (
          <div className="edit-section">
            <h2>Edit Current Question</h2>
            <button id="addbutton" onClick={() => setIsEditing(!isEditing)}>
              {isEditing ? "Cancel" : "Edit Question"}
            </button>

            {isEditing && (
              <div className="edit-form">
                <input
                  type="text"
                  placeholder="Question"
                  value={editingQuestion.question}
                  onChange={(e) =>
                    setEditingQuestion({
                      ...editingQuestion,
                      question: e.target.value,
                    })
                  }
                />
                <input
                  type="text"
                  placeholder="Answer"
                  value={editingQuestion.answer}
                  onChange={(e) =>
                    setEditingQuestion({
                      ...editingQuestion,
                      answer: e.target.value,
                    })
                  }
                />
                <button id="addbutton" onClick={handleUpdateQuestion}>
                  Update Question
                </button>
              </div>
            )}
          </div>
        )}

        {questions.length > 0 && (
          <div className="delete-section">
            <h2>Delete Current Question</h2>
            <button id="addbutton" onClick={handleDeleteQuestion}>
              Delete Question
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Admin;
