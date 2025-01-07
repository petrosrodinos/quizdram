import { ref, computed, onUnmounted } from "vue";

export function useTimer() {
  const timer = ref(0);

  const isRunning = ref(false);

  let interval: ReturnType<typeof setInterval> | null = null;

  const startTimer = () => {
    if (!isRunning.value) {
      isRunning.value = true;
      interval = setInterval(() => {
        timer.value++;
      }, 1000);
    }
  };

  const pauseTimer = () => {
    if (isRunning.value) {
      isRunning.value = false;
      if (interval) {
        clearInterval(interval);
        interval = null;
      }
    }
  };

  const resetTimer = () => {
    timer.value = 0;
    isRunning.value = false;
    if (interval) {
      clearInterval(interval);
      interval = null;
    }
  };

  const formattedTime = computed(() => {
    const minutes = Math.floor(timer.value / 60)
      .toString()
      .padStart(2, "0");
    const seconds = (timer.value % 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
  });

  onUnmounted(() => {
    if (interval) clearInterval(interval);
  });

  return {
    timer,
    formattedTime,
    isRunning,
    startTimer,
    pauseTimer,
    resetTimer,
  };
}
