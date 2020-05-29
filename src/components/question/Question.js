import React, { useContext } from "react";
import QuizContext from "../../context/QuizContext";

const Question = () => {
  const { state } = useContext(QuizContext);
  const { currentQuestion, questions } = state;
  const question = questions[currentQuestion];
  return (
    <div className="question">
      <h2 className="subtitle">{question.question}</h2>
    </div>
  );
};

export default Question;
