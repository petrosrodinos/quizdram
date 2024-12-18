<script lang="ts" setup>
import { defineAsyncComponent, ref } from "vue";
import { useMutation } from "@tanstack/vue-query";
import { generateQuiz } from "../../../services/quiz";

defineProps<{
  option: string;
}>();

const { mutate } = useMutation({
  mutationFn: (newTodo: any) => generateQuiz(newTodo),
  onSuccess: async (res: any) => {
    console.log(res);
  },
});

const source = ref("");

const options: any = {
  doc: defineAsyncComponent(() => import("./doc.vue")),
  ai: defineAsyncComponent(() => import("./ai.vue")),
  text: defineAsyncComponent(() => import("./text.vue")),
  video: defineAsyncComponent(() => import("./video.vue")),
};

const handleSourceSelect = (value: string) => {
  source.value = value;
  // mutate({ source });
};
</script>

<template>
  <div>
    <component @onSourceSelect="handleSourceSelect" :is="options[option]" />
    <div v-if="source">
      <el-button @click="mutate({ source })">Next</el-button>
    </div>
  </div>
</template>

<style scoped></style>
