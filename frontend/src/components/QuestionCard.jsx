import { motion } from "framer-motion";
// import { useState } from "react";
import "./flipcard.scss";

function QuestionCard({ question, answer, isFlipped, handleFlip }) {
  

  

  return (
    <div className={"flipCardContainer"}>
      <motion.div
        className={"flipCard"}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6 }}
        onClick={handleFlip}
      >
        <motion.div className={`cardFace frontFace`}>
          <h4>{question}</h4>
        </motion.div>
        <motion.div className={`cardFace backFace`}>
          <h4>{isFlipped && answer}</h4>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default QuestionCard;
