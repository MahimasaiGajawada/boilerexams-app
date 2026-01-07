import QuestionPage from "./questionpage";

// fetch the question
async function getQuestion(id: string) {
  //  fetch to our api
  const response = await fetch(`https://api.boilerexams.com/questions/${id}`);
  if (!response.ok) {
    throw new Error("Failed to fetch question");
  }
  return response.json();
}

const id = "d44531f1-3cf7-404d-bd10-e9a786484b8a";

export default async function Questions() {
  const question = await getQuestion(id);

  return <QuestionPage data={question.data} />;
}
