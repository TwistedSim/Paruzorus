import React, { useCallback, useEffect, useState } from "react";
import QuestionCard from "./QuestionCard";
import { fetchQuestion, validateQuestion, fetchCurrentScore } from "../API";

const Quiz = () => {
  const [loading, setLoading] = useState(false);
  const [question, setQuestion] = useState("");
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [success, setSuccess] = useState(false);
  const [userAnswer, setUserAnswer] = useState("");
  const [questionAnswered, setQuestionAnswered] = useState(0);
  const [score, setScore] = useState(0);
  const [validate, setValidate] = useState(false);

  useEffect(() => {
    setLoading(true);
    startQuiz();
    setLoading(false);
  }, [setLoading, setScore, setQuestionAnswered, setUserAnswer, setLoading]);

  const startQuiz = useCallback(async () => {
    setQuestion(await fetchQuestion());
    const [score, question] = await fetchCurrentScore();
    setScore(score);
    setQuestionAnswered(question);
  }, []);

  const checkAnswer = async (answer) => {
    setUserAnswer(answer);
    setValidate(true);
    const response = await validateQuestion(answer);
    if (!response) return;
    setScore(response["current_score"]);
    setSuccess(response["success"]);
    setCorrectAnswer(response["correct_answer"]);
    setQuestionAnswered(response["question_answered"]);
  };

  const nextQuestion = async () => {
    setLoading(true);
    setQuestion(await fetchQuestion());
    setUserAnswer("");
    setValidate(false);
    setLoading(false);
  };

  return (
    <div className="container">
      <h1>Paruzorus</h1>
      {<p>Score: {score}</p>}
      {loading && <p>Loading question...</p>}
      <p>Question answered: {questionAnswered} </p>
      {!loading && (
        <QuestionCard
          question={question}
          checkAnswer={checkAnswer}
          answer={userAnswer}
          setAnswer={setUserAnswer}
          answerSent={validate}
          nextQuestion={nextQuestion}
        />
      )}
      {validate && (
        <div>
          <p>{success ? "Correct" : "Wrong"}</p>
          <p> Correct answer: {correctAnswer}</p>
        </div>
      )}
    </div>
  );
};

export default Quiz;
