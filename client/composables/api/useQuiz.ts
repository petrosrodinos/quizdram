import type { GetAttempt, NewQuiz, NewQuizAttempt, Quiz } from "../../interfaces/quiz";
import axios from "axios";
import { useRuntimeConfig } from "nuxt/app";

export const useQuiz = () => {
  const config = useRuntimeConfig();
  const API_URL = config.public.apiUrl;

  const createQuiz = async (quiz: NewQuiz, token: string | undefined): Promise<Quiz> => {
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

  const getQuizzes = async (query: { [key: string]: string } = {}): Promise<Quiz[]> => {
    try {
      const response = await axios.get(`${API_URL}/quiz?${searchParams(query)}`);
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

  const getQuiz = async (id: string, query: { [key: string]: string } = {}): Promise<Quiz> => {
    try {
      const response = await axios.get(`${API_URL}/quiz/${id}?${searchParams(query)}`);
      const data = response.data;
      if (!Object.keys(data).length) {
        throw new Error("Quiz not found");
      }
      const formattedData = {
        ...data,
        id: data._id,
      };
      return formattedData;
    } catch (error: any) {
      throw new Error(error.response.data.message);
    }
  };

  const createAttempt = async (payload: NewQuizAttempt, token: string) => {
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

  const getAttempt = async (quizId: string, attemptId: string): Promise<GetAttempt> => {
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

  return {
    createQuiz,
    getQuizzes,
    getQuiz,
    createAttempt,
    getAttempt,
  };
};
