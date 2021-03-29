import React from "react";
import PropTypes from "prop-types";

const QuestionCard = ({
  question,
  answers,
  callback,
  userAnswer,
  questionNr,
  totalQuestions,
}) => (
  <div>
    <p className="number">
      Question: {questionNr} / {totalQuestions}
    </p>
    <p dangerouslySetInnerHTML={{ __html: question }}></p>
    <div>
      {answers.map((answer) => (
        <div key={answer}>
          <button disabled={!!userAnswer} value={answer} onClick={callback}>
            <span dangerouslySetInnerHTML={{ __html: answer }} />
          </button>
        </div>
      ))}
    </div>
  </div>
);

QuestionCard.propTypes = {
  question: PropTypes.string,
  answers: PropTypes.array,
  callback: PropTypes.any,
  userAnswer: PropTypes.any,
  questionNr: PropTypes.number,
  totalQuestions: PropTypes.number,
};

export default QuestionCard;
