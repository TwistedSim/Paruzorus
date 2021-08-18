import React, { useEffect } from "react";

const QuestionCard = ({
  question,
  checkAnswer,
  answer,
  setAnswer,
  answerSent,
  nextQuestion,
}) => {
  useEffect(() => {
    const listener = (event) => {
      if (event.key === "Enter" || event.key === "NumpadEnter") {
        event.preventDefault();
        handleButtonClick();
      }
    };
    document.addEventListener("keydown", listener);
    return () => {
      document.removeEventListener("keydown", listener);
    };
  }, [answerSent, answer]);

  const handleButtonClick = () => {
    if (answerSent) nextQuestion();
    else checkAnswer(answer);
  };

  const answerChanged = (e) => {
    setAnswer(e.target.value);
  };

  return (
    <div>
      <img src={question} className="center" />
      <br />
      <input
        type="text"
        value={answer}
        className="center"
        disabled={!!answerSent}
        placeholder="Enter your answer..."
        onChange={answerChanged}
        autoFocus
      />
      <input
        type="button"
        value={answerSent ? "Next" : "Send"}
        className="center"
        onClick={handleButtonClick}
      />
    </div>
  );
};

export default QuestionCard;
