import "./App.scss";
import QuestionCard from "./components/QuestionCard";
import { useState, useEffect } from "react";
import { fetchQuestions } from "./utilfolder/utils"; // Import the fetchQuestions function

const Game = () => {
  const [questions, setQuestions] = useState([]);
  const [index, setIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

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

  function handleClick(add) {
    setIsFlipped(false);
    if (add) {
      setIndex((prev) => Math.min(prev + 1, questions.length - 1));
    } else {
      setIndex((prev) => Math.max(prev - 1, 0));
    }
  }

  function handleFlip() {
    setIsFlipped((prev) => !prev);
  }

  return (
    <>
      <div className="maincontainer">
        <h1>Question Game</h1>
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
      </div>
    </>
  );
};

export default Game;
