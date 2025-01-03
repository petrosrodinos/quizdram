import { useAuthStore } from "../stores/auth";

export default defineNuxtRouteMiddleware((context) => {
  const auth = useAuthStore();
  if (!auth.user) {
    return navigateTo("/auth/login");
  }
});
