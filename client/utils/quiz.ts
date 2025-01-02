import type { User } from "../interfaces/user";
import type { Question, Quiz, QuizAttempt } from "../interfaces/quiz";

export const calculateResult = (quiz: Quiz, selectedAnswers: string[]): string => {
  if (!quiz || selectedAnswers.length == 0) return "0";
  let score = 0;
  quiz.questions.forEach((question, index) => {
    if (calculateCorrect(question, selectedAnswers[index])) {
      score++;
    }
  });
  const result = ((score / quiz.questions.length) * 100).toFixed(0);
  return result;
};

export const calculateCorrect = (question: Question, answer: string) => {
  if (question.type == "multiple") {
    return question.answers[Number(question.correct)] == answer;
  } else {
    return question.correct == answer;
  }
};

export const findBestResult = (quiz: Quiz): { user: User; result: number } => {
  let userResults: { user: User; result: number }[] = [];

  quiz.attempts.forEach((attempt: QuizAttempt) => {
    const result = parseInt(calculateResult(quiz, attempt.selectedAnswers));
    userResults.push({
      user: attempt.userId,
      result,
    });
  });

  userResults.sort((a, b) => b.result - a.result);

  const bestResult = userResults[0];

  return bestResult;
};
