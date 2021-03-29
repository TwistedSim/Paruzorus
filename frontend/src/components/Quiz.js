import React, { useState } from "react";
import QuestionCard from "./QuestionCard";
import fetchQuizQuestion, { Difficulty } from "../API";

const TOTAL_QUESTIONS = 10;

const Quiz = () => {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [number, setNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);

  const startQuiz = async () => {
    setLoading(true);
    setGameOver(false);

    const newQuestions = await fetchQuizQuestion(
      TOTAL_QUESTIONS,
      Difficulty.EASY
    );

    setQuestions(newQuestions);
    setScore(0);
    setUserAnswers([]);
    setNumber(0);
    setLoading(false);
  };

  const checkAnswer = (e) => {
    if (gameOver) return;
    const answer = e.currentTarget.value;
    const correct = questions[number].correct_answer === answer;
    if (correct) setScore((prev) => prev + 1);

    const answerObj = {
      question: questions[number].question,
      answer,
      correct,
      correct_answer: questions[number].correct_answer,
    };
    setUserAnswers((prev) => [...prev, answerObj]);
  };

  const nextQuestion = () => {
    const nextQuestion = number + 1;
    if (nextQuestion === TOTAL_QUESTIONS) {
      setGameOver(true);
    } else {
      setNumber(nextQuestion);
    }
  };

  return (
    <div>
      <h1>Paruzorus</h1>
      {(gameOver || userAnswers.length == TOTAL_QUESTIONS) && (
        <button className="start" onClick={startQuiz}>
          Start
        </button>
      )}
      {!gameOver && <p className="score">Score: {score}</p>}
      {loading && <p>Loading question...</p>}
      {!loading && !gameOver && !!questions && (
        <QuestionCard
          questionNr={number + 1}
          totalQuestions={TOTAL_QUESTIONS}
          question={questions[number].question}
          answers={questions[number].answers}
          userAnswer={userAnswers[number] ?? undefined}
          callback={checkAnswer}
        />
      )}
      {!gameOver &&
        !loading &&
        userAnswers.length === number + 1 &&
        number !== TOTAL_QUESTIONS - 1 && (
          <button className="next" onClick={nextQuestion}>
            Next Question
          </button>
        )}
    </div>
  );
};

export default Quiz;
