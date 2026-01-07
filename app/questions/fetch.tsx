export async function getQuestion(id: string) {
  const res = await fetch(`https://api.boilerexams.com/questions/${id}`);
  if (!res.ok) throw new Error("Failed to fetch question");
  return res.json();
}
