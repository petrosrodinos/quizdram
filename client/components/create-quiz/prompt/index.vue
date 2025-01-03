<script lang="ts" setup>
import { ElMessageBox } from "element-plus";
import { navigateTo } from "nuxt/app";
import { defineAsyncComponent, defineEmits, h } from "vue";
import { useAuthStore } from "../../../stores/auth";
import { useTokenDialog } from "../../../composables/useTokenDialog";

const { option } = defineProps<{
  option: string;
}>();

const emit = defineEmits(["onPromptSelected"]);

const { showNoTokensDialog } = useTokenDialog();

const authStore = useAuthStore();

const options: any = {
  doc: defineAsyncComponent(() => import("./doc.vue")),
  ai: defineAsyncComponent(() => import("./ai.vue")),
  text: defineAsyncComponent(() => import("./text.vue")),
  video: defineAsyncComponent(() => import("./video.vue")),
};

const handlePromptSelected = (prompt: string) => {
  if (authStore.user?.tokens === 0) {
    showNoTokensDialog();
    return;
  }
  emit("onPromptSelected", prompt);
};
</script>

<template>
  <div>
    <component @onPromptSelected="handlePromptSelected" :is="options[option]" />
  </div>
</template>

<style scoped>
div {
  margin-left: 5px;
  margin-right: 5px;
}
</style>
