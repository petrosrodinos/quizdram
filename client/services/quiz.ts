import axios from "axios";

export const generateQuiz = async (quiz: any) => {
  try {
    const response = await axios.post(`${API_URL}/quiz`, quiz);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
