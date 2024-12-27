import axios from "axios";
import type { NewQuiz } from "../interfaces/quiz";

export const createQuiz = async (quiz: NewQuiz) => {
  try {
    const response = await axios.post(`${API_URL}/quiz`, quiz);
    return response.data.result;
  } catch (error) {
    console.error(error);
  }
};
