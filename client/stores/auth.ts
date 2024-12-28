import type { User } from "@interfaces/auth";
import { defineStore } from "pinia";

const STORE_KEY = "AUTH";

export const useAuthStore = defineStore(
  STORE_KEY,
  () => {
    const user = ref<User | null>(null);
    function setUser(newUser: User) {
      user.value = newUser;
    }
    function updateUser(newUser: Partial<User>) {
      user.value = { ...user.value, ...newUser } as User;
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
