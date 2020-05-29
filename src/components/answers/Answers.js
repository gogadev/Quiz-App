import React, { useContext } from "react";
import QuizContext from "../../context/QuizContext";

import Answer from "../answer/Answer";

const Answers = () => {
  const { state, dispatch } = useContext(QuizContext);
  const { currentAnswer, currentQuestion, questions } = state;
  const question = questions[currentQuestion];

  return (
    <div className="answers">
      <Answer
        letter="a"
        answer={question.answer_a}
        dispatch={dispatch}
        selected={currentAnswer === "a"}
      />
      <Answer
        letter="b"
        answer={question.answer_b}
        dispatch={dispatch}
        selected={currentAnswer === "b"}
      />
      <Answer
        letter="c"
        answer={question.answer_c}
        dispatch={dispatch}
        selected={currentAnswer === "c"}
      />
      <Answer
        letter="d"
        answer={question.answer_d}
        dispatch={dispatch}
        selected={currentAnswer === "d"}
      />
    </div>
  );
};

export default Answers;
