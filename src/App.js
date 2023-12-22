// App.js

import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./Components/Home";
import Question from "./Components/Question";
import qBank from "./Components/QuestionBank";
import Score from "./Components/Score";
import "./App.css";

const App = () => {
  const [questionBank, setQuestionBank] = useState(qBank);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState("");
  const [score, setScore] = useState(0);
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizEnd, setQuizEnd] = useState(false);
  const [timer, setTimer] = useState(10);

  const handleStartQuiz = () => {
    setQuizStarted(true);
  };

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    checkAnswer();
    handleNextQuestion();
  };

  const checkAnswer = () => {
    if (selectedOption === questionBank[currentQuestion].answer) {
      setScore((prevScore) => prevScore + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestion + 1 < questionBank.length) {
      setCurrentQuestion((prevQuestion) => prevQuestion + 1);
      setSelectedOption("");
      setTimer(10); // Reset the timer for the next question
    } else {
      setQuizEnd(true);
    }
  };

  useEffect(() => {
    let interval;
    if (!quizEnd) {
      interval = setInterval(() => {
        if (timer > 0) {
          setTimer((prevTimer) => prevTimer - 1);
        } else {
          handleNextQuestion();
        }
      }, 1000);
    }

    return () => clearInterval(interval); // Cleanup the interval on component unmount or quiz end
  }, [timer, quizEnd]);

  return (
    <div className="App d-flex flex-column align-items-center justify-content-center">
      <h1 className="app-title">QUIZ APP</h1>
      {!quizStarted ? (
        <Home onStartQuiz={handleStartQuiz} />
      ) : !quizEnd ? (
        <div className="question-container">
          <p className="timer">Time left: {timer} seconds</p>
          <Question
            question={questionBank[currentQuestion]}
            selectedOption={selectedOption}
            onOptionChange={handleOptionChange}
            onSubmit={handleFormSubmit}
          />
        </div>
      ) : (
        <div className="score-container">
          <p className="score-text">Your Score: {score}</p>
          <button className="score-button" onClick={handleNextQuestion}>
            Next Question
          </button>
        </div>
      )}
    </div>
  );
};

export default App;
