import axios from "axios";
import type { NewQuiz } from "../interfaces/quiz";
import { getHeaders } from "./utils";

export const createQuiz = async (quiz: NewQuiz, token: string | undefined) => {
  try {
    const response = await axios.post(`${API_URL}/quiz`, quiz, {
      headers: getHeaders(token),
    });
    const data = response.data;
    const formattedData = {
      ...data,
      id: data._id,
    };
    return formattedData;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};

export const getQuizes = async () => {
  try {
    const response = await axios.get(`${API_URL}/quiz`);
    const data = response.data;
    const formattedData = data.map((quiz: any) => ({
      ...quiz,
      id: quiz._id,
    }));
    return formattedData;
  } catch (error) {
    console.error(error);
  }
};
