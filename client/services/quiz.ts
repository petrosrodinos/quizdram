import axios from "axios";
import type { NewQuiz } from "~/interfaces/quiz";

export const generateQuiz = async (quiz: NewQuiz) => {
  try {
    const response = await axios.post(`${API_URL}/quiz`, quiz);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
