import type { SignUp, Login, LoggedUser } from "@interfaces/auth";
import axios from "axios";
import { useRuntimeConfig } from "nuxt/app";

export const useAuth = () => {
  const config = useRuntimeConfig();
  const API_URL = config.public.apiUrl;
  const signUp = async (payload: SignUp): Promise<LoggedUser> => {
    try {
      const result = await axios.post(`${API_URL}/auth/signup`, payload);
      const data = result.data;
      const reformedData = {
        token: data.token,
        id: data.user._id,
        username: data.user.username,
        email: data.user.email,
        avatar: data.user.avatar,
        tokens: data.user.tokens,
      };
      return reformedData;
    } catch (error: any) {
      throw new Error(error.response.data.message);
    }
  };

  const logIn = async (payload: Login): Promise<LoggedUser> => {
    try {
      const result = await axios.post(`${API_URL}/auth/signin`, payload);
      const data = result.data;
      const reformedData = {
        token: data.token,
        id: data.user._id,
        username: data.user.username,
        email: data.user.email,
        avatar: data.user.avatar,
        tokens: data.user.tokens,
      };
      return reformedData;
    } catch (error: any) {
      throw new Error(error.response.data.message);
    }
  };

  return {
    signUp,
    logIn,
  };
};
