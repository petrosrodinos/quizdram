<script lang="ts" setup>
import { ref, defineAsyncComponent } from "vue";
import { ArrowLeft } from "@element-plus/icons-vue";
import type { NewQuiz } from "../../interfaces/quiz";

const step = ref(0);
const selectedOption = ref("");
const quizSettings = ref({});

const steps: any = [
  {
    title: "Choose a source",
    component: "step1",
  },
  {
    title: "Create Quiz",
    component: "step2",
  },
  {
    title: "Finalize",
    component: "step3",
  },
];

const components: any = {
  step1: defineAsyncComponent(() => import("./step1.vue")),
  step2: defineAsyncComponent(() => import("./step2/index.vue")),
  step3: defineAsyncComponent(() => import("./step3/index.vue")),
};

const handleOptionClick = (option: string) => {
  selectedOption.value = option;
  step.value++;
};

const handleSettingsSelect = (settings: NewQuiz) => {
  quizSettings.value = settings;
  step.value++;
};

const handleGoBack = () => {
  if (step.value > 0) step.value -= 1;
};
</script>

<template>
  <div class="create-quiz-container">
    <h3>{{ steps[step].title }}</h3>
    <component
      :is="components[steps[step].component]"
      :option="selectedOption"
      @onOptionClick="handleOptionClick"
      @onSettingsSelect="handleSettingsSelect"
      :quizSettings="quizSettings"
    />

    <div class="step-buttons">
      <el-button @click="handleGoBack" v-if="step > 0" type="danger" :icon="ArrowLeft"
        >Back</el-button
      >
    </div>
  </div>
</template>

<style scoped>
.create-quiz-container {
  padding: 1rem;
  margin: 0 auto;
  max-width: 800px;
}

.step-buttons {
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
}
</style>
