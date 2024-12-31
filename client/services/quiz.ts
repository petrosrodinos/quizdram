import axios from "axios";
import type { NewQuizAttempt, NewQuiz, Quiz, GetAttempt } from "../interfaces/quiz";
import { getHeaders } from "./utils";

export const createQuiz = async (quiz: NewQuiz, token: string | undefined): Promise<Quiz> => {
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

export const getQuizzes = async (token: string): Promise<Quiz[]> => {
  try {
    const response = await axios.get(`${API_URL}/quiz`, {
      headers: getHeaders(token),
    });
    const data = response.data;
    const formattedData = data.map((quiz: any) => ({
      ...quiz,
      id: quiz._id,
    }));
    return formattedData;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};

export const getQuiz = async (id: string): Promise<Quiz> => {
  try {
    const response = await axios.get(`${API_URL}/quiz/${id}`);
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

export const createAttempt = async (payload: NewQuizAttempt, token: string) => {
  try {
    const response = await axios.post(`${API_URL}/quiz/${payload.quizId}/attempt`, payload, {
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

export const getAttempt = async (quizId: string, attemptId: string): Promise<GetAttempt> => {
  try {
    const response = await axios.get(`${API_URL}/quiz/${quizId}/attempt/${attemptId}`);
    const data = response.data;
    const formattedData = {
      ...data,
      quiz: {
        ...data.quiz,
        id: data.quiz._id,
      },
    };
    return formattedData;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};
