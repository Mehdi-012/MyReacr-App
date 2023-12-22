// Home.js

import React from "react";

const Home = ({ onStartQuiz }) => {
  return (
    <div>
      <h2>Welcome to the Quiz!</h2>
      <p>Test your knowledge on front-end development with our quiz. Are you ready?</p>
      <button onClick={onStartQuiz}>Start Quiz</button>
    </div>
  );
};

export default Home;
