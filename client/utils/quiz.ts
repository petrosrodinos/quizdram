import type { Question, Quiz } from "../interfaces/quiz";

export const calculateResult = (quiz: Quiz, selectedAnswers: string[]) => {
  if (!quiz || selectedAnswers.length == 0) return;
  let score = 0;
  quiz.questions.forEach((question, index) => {
    if (calculateCorrect(question, selectedAnswers[index])) {
      score++;
    }
  });
  return (score / quiz.questions.length) * 100;
};

export const calculateCorrect = (question: Question, answer: string) => {
  if (question.type == "multiple") {
    return question.answers[Number(question.correct)] == answer;
  } else {
    return question.correct == answer;
  }
};