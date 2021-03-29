export const Difficulty = Object.freeze({
  EASY: "easy",
  MEDIUM: "medium",
  HARD: "hard",
});

export const fetchQuizQuestion = async (amount, difficulty) => {
  const endpoint = `https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}&type=multiple`;
  const data = await (await fetch(endpoint)).json();
  return data.results.map((question) => ({
    ...question,
    answers: [...question.incorrect_answers, question.correct_answer],
  }));
};

export default fetchQuizQuestion;
