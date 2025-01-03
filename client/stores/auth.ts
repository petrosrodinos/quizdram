import type { LoggedUser } from "@interfaces/auth";
import { defineStore } from "pinia";

const STORE_KEY = "AUTH";

export const useAuthStore = defineStore(
  STORE_KEY,
  () => {
    const user = ref<LoggedUser | null>(null);
    function setUser(newUser: LoggedUser) {
      user.value = newUser;
    }
    function updateUser(newData: Partial<LoggedUser>) {
      user.value = { ...user.value, ...newData } as LoggedUser;
    }
    function logout() {
      user.value = null;
    }
    return { user, setUser, logout, updateUser };
  },
  {
    persist: true,
  }
);
