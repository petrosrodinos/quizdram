<script setup>
import { ElCard, ElRow, ElCol } from "element-plus";
import { Calendar, Document, Edit } from "@element-plus/icons-vue";
import { useQuery } from "@tanstack/vue-query";
import { useAuthStore } from "../../../stores/auth";
import { getQuizzes } from "../../../services/quiz";

const authStore = useAuthStore();

const { isLoading, data, error } = useQuery({
  queryKey: ["quizes", authStore?.user?.id],
  queryFn: () => getQuizzes(authStore.user.token),
  enabled: !!authStore?.user,
});
</script>

<template>
  <div class="quiz-container">
    <h1 class="quiz-title">your quizes</h1>
    <NuxtLink to="/user/quizzes/new"
      ><ElButton type="success" :icon="Edit">create a quiz</ElButton></NuxtLink
    >
    <p v-if="isLoading">getting your quizzes...</p>
    <QuizCards :quizes="data" />

    <el-alert
      v-if="data?.length == 0 && !isLoading"
      :closable="false"
      effect="dark"
      title="your quizzes are empty."
      type="warning"
    />
    <el-alert
      v-if="(error || !data) && !isLoading"
      :closable="false"
      title="error finding your quizes."
      type="error"
    />
  </div>
</template>

<style lang="scss" scoped>
.quiz-container {
  padding: 10px;

  button {
    margin-bottom: 10px;
  }

  a {
    text-decoration: none;
  }
}
</style>
