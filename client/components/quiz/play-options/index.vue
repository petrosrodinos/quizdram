<script setup lang="ts">
import { ElCard, ElButton } from "element-plus";
import { Edit, UserFilled, Notebook } from "@element-plus/icons-vue";
import type { Quiz } from "../../../interfaces/quiz";
import { navigateTo } from "nuxt/app";
import { ref } from "vue";

const { quiz } = defineProps<{
  quiz: Quiz;
}>();

const dialogFormVisible = ref(false);

const handlePlayQuiz = async () => {
  await navigateTo(`/quizzes/${quiz.id}/play`);
};

const handlePlayWithFriends = () => {
  dialogFormVisible.value = !dialogFormVisible.value;
};
</script>

<template>
  <div>
    <h2>play options</h2>
    <ElCard shadow="always" class="custom-card">
      <div class="button-container">
        <ElButton @click="handlePlayQuiz" type="primary" :icon="Edit">take quiz</ElButton>

        <ElButton @click="handlePlayWithFriends" type="success" :icon="UserFilled"
          >play with friends</ElButton
        >

        <ElButton disabled type="warning" :icon="Notebook">create assignment</ElButton>
      </div>
    </ElCard>
    <QuizPlayOptionsShare
      :visible="dialogFormVisible"
      @update:visible="dialogFormVisible = $event"
      :quiz="quiz"
    />
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
