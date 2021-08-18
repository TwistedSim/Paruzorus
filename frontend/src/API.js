import { BASE_URL_API } from "./config";

export const fetchQuestion = async () => {
  const endpoint = `${BASE_URL_API}/quiz/new_question`;
  const data = await (await fetch(endpoint)).json();
  return data["picture_url"];
};

export const fetchCurrentScore = async () => {
  const endpoint = `${BASE_URL_API}/quiz/current_score`;
  const data = await (await fetch(endpoint)).json();
  return [data["current_score"], data["question_answered"]];
};

export const validateQuestion = async (answer) => {
  const endpoint = `${BASE_URL_API}/quiz/validate_answer`;
  const response = await fetch(endpoint, {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ answer }),
  });

  if (response.status !== 200) {
    const msg = await response.json();
    console.log(msg);
    return null;
  }

  const data = await response.json();
  console.log(data);
  return data;
};
