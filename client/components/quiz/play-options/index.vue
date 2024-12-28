<script setup lang="ts">
import { ElCard, ElButton } from "element-plus";
import { Edit, UserFilled, Notebook } from "@element-plus/icons-vue";
import type { Quiz } from "../../../interfaces/quiz";
import { navigateTo } from "nuxt/app";

const { quiz } = defineProps<{
  quiz: Quiz;
}>();

const handlePlayQuiz = async () => {
  await navigateTo(`/user/quizes/${quiz.id}/play`);
};
</script>

<template>
  <div>
    <ElCard shadow="always" class="custom-card">
      <h2>play options</h2>
      <div class="button-container">
        <ElButton @click="handlePlayQuiz" type="primary" :icon="Edit">take quiz</ElButton>

        <ElButton type="success" :icon="UserFilled">play with friends</ElButton>

        <ElButton disabled type="warning" :icon="Notebook">create assignment</ElButton>
      </div>
    </ElCard>
  </div>
</template>

<style lang="scss" scoped>
.custom-card {
  margin-top: 10px;
  margin-bottom: 10px;
  width: 100%;
}

.button-container {
  display: flex;
  gap: 15px;

  @media screen and (max-width: 600px) {
    flex-direction: column;
    align-items: center;
    justify-content: center;
    button {
      width: 100%;
    }
  }
}
</style>
