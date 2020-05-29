import React, { useReducer } from "react";

import QuizContext from "./context/QuizContext";
import quizReducer from "./reducers/QuizReducer";

import {
  SET_ANSWERS,
  SET_CURRENT_QUESTION,
  SET_CURRENT_ANSWER,
  SET_ERROR,
  SET_SHOW_RESULTS,
  RESET_QUIZ,
} from "./reducers/types.js";

import Header from "./components/header/Header";
import Progress from "./components/progress/Progress";
import Question from "./components/question/Question";
import Answers from "./components/answers/Answers";

import "./App.css";

const App = () => {
  const questions = [
    {
      id: 1,
      question: "What Is The Capital Of Slovenia?",
      answer_a: "Maribor",
      answer_b: "Ljubljana",
      answer_c: "Koper",
      answer_d: "Portoroz",
      correct_answer: "b",
    },
    {
      id: 2,
      question: "The Longest Place Name In Ireland?",
      answer_a: "Muckanaghederdauhaulia",
      answer_b: "Dalosiaretereioa",
      answer_c: "Hollosteyhepostia",
      answer_d: "Samhaineportobello",
      correct_answer: "a",
    },
    {
      id: 3,
      question: "The Oldest Bookshop In The World Is In...?",
      answer_a: "Spain",
      answer_b: "Switzerland",
      answer_c: "Portugal",
      answer_d: "Sweden",
      correct_answer: "c",
    },
  ];

  const initialState = {
    questions,
    currentQuestion: 0,
    currentAnswer: "",
    answers: [],
    showResults: false,
    error: "",
  };

  const [state, dispatch] = useReducer(quizReducer, initialState);
  const { currentQuestion, currentAnswer, answers, showResults, error } = state;

  const question = questions[currentQuestion];

  const showErr = () => {
    if (!error) {
      return;
    }
    return <div className="err">{error}</div>;
  };

  const renderResults = (question, answer) => {
    if (question.correct_answer === answer.answer) {
      return <div className="correct">Correct</div>;
    }
    return <div className="fail">Incorrect</div>;
  };

  const renderData = () => {
    return answers.map((answer) => {
      const question = questions.find(
        (question) => question.id === answer.questionId
      );
      return (
        <div key={question.id}>
          {question.question} ~ {renderResults(question, answer)}
        </div>
      );
    });
  };

  const restart = () => {
    dispatch({ type: RESET_QUIZ });
  };

  const next = () => {
    const answer = { questionId: question.id, answer: currentAnswer };

    if (!currentAnswer) {
      dispatch({ type: SET_ERROR, error: "Please Select An Option" });
      return;
    }
    answers.push(answer);
    dispatch({ type: SET_ANSWERS, answers });
    dispatch({ type: SET_CURRENT_ANSWER, currentAnswer: "" });

    if (currentQuestion + 1 < questions.length) {
      dispatch({
        type: SET_CURRENT_QUESTION,
        currentQuestion: currentQuestion + 1,
      });
      return;
    }
    dispatch({ type: SET_SHOW_RESULTS, showResults: true });
  };

  if (showResults) {
    return (
      <div className="results">
        <h2 className="title">Results</h2>
        <div className="data">{renderData()}</div>
        <button className="btn" onClick={restart}>
          Restart
        </button>
      </div>
    );
  } else {
    return (
      <QuizContext.Provider value={{ state, dispatch }}>
        <Header />
        <Progress total={questions.length} current={currentQuestion + 1} />
        <Question />
        {showErr()}
        <Answers />
        <button className="btn" onClick={next}>
          Confirm And Continue
        </button>
      </QuizContext.Provider>
    );
  }
};

export default App;
