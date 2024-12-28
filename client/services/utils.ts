import { useAuthStore } from "../stores/auth";

// const useNuxtApp = () => {
//   return (globalThis as any).$nuxt;
// };

export const getHeaders = (token: string | undefined) => {
  //   const nuxtApp = useNuxtApp();
  //   const authStore = useAuthStore(nuxtApp.$pinia);

  //   const token = authStore?.user?.token || "";

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };

  return headers;
};
