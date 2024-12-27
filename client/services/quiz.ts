import axios from "axios";
import type { NewQuiz } from "../interfaces/quiz";

export const createQuiz = async (quiz: NewQuiz) => {
  try {
    const response = await axios.post(`${API_URL}/quiz`, quiz);
    const data = response.data;
    const formattedData = {
      ...data,
      id: data._id,
    };
    return formattedData;
  } catch (error) {
    console.error(error);
  }
};
