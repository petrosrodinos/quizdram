import axios from "axios";
import TestQuiz from "../assets/test-quiz.json";

export const generateQuiz = async (quiz: any) => {
  return JSON.parse(JSON.stringify(TestQuiz));
  // try {
  //     const response = await axios.post('/api/quiz', quiz);
  //     return response.data;
  // } catch (error) {
  //     console.error(error);
  // }
};
