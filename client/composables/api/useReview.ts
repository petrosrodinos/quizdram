import type { NewReview } from "../../interfaces/review";
import axios from "axios";
import { useRuntimeConfig } from "nuxt/app";
import { useAuthStore } from "../../stores/auth";

export const useReview = () => {
  const config = useRuntimeConfig();
  const API_URL = config.public.apiUrl;

  const authStore = useAuthStore();

  const createReview = async (payload: NewReview): Promise<any> => {
    try {
      const result = await axios.post(`${API_URL}/review`, payload, {
        headers: getHeaders(authStore.user?.token),
      });
      const data = result.data;
      return data;
    } catch (error: any) {
      throw new Error(error.response.data.message);
    }
  };

  return {
    createReview,
  };
};
