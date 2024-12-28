import type { SignUp, Login, User } from "@interfaces/auth";
import axios from "axios";
import { API_URL } from "../utils/constants";

export const signUp = async (payload: SignUp): Promise<User> => {
  try {
    const result = await axios.post(`${API_URL}/auth/signup`, payload);
    const data = result.data;
    const reformedData = {
      token: data.token,
      id: data.user._id,
      username: data.user.username,
      email: data.user.email,
      avatar: data.user.avatar,
    };
    return reformedData;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};

export const logIn = async (payload: Login): Promise<User> => {
  try {
    const result = await axios.post(`${API_URL}/auth/signin`, payload);
    const data = result.data;
    const reformedData = {
      token: data.token,
      id: data.user._id,
      username: data.user.username,
      email: data.user.email,
      avatar: data.user.avatar,
    };
    return reformedData;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};