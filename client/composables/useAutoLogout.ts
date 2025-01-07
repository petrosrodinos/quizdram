import { onMounted, onBeforeUnmount } from "vue";
import { useAuthStore } from "../stores/auth";

export const useAutoLogout = () => {
  const userStore = useAuthStore();

  const checkTokenExpiration = () => {
    if (userStore.user && userStore.user.exp) {
      const currentTime = Math.floor(Date.now() / 1000);
      const expirationTime = userStore.user.exp;

      if (currentTime >= expirationTime) {
        userStore.logout();
      }
    }
  };

  let expirationInterval: ReturnType<typeof setInterval>;

  onMounted(() => {
    checkTokenExpiration();
    expirationInterval = setInterval(checkTokenExpiration, 60000);
  });

  onBeforeUnmount(() => {
    clearInterval(expirationInterval);
  });

  return { checkTokenExpiration };
};
