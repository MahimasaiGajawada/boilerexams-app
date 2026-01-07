import QuestionPage from "./questionpage";
import { getQuestion } from "./fetch";

const id = "d44531f1-3cf7-404d-bd10-e9a786484b8a";

export default async function Questions() {
  const question = await getQuestion(id);

  return <QuestionPage data={question.data} />;
}
