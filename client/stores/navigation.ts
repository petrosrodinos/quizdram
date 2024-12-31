import { defineStore } from "pinia";

const STORE_KEY = "NAVIGATION";

export const useNavigationStore = defineStore(
  STORE_KEY,
  () => {
    const selectedLink = ref<string>();
    function setSelectedLink(value: string) {
      selectedLink.value = value;
    }

    return { selectedLink, setSelectedLink };
  },
  {
    persist: true,
  }
);
