<script setup>
import { useQuizStore } from "../../../stores/quiz";
import { ElCard, ElRow, ElCol } from "element-plus";
import { Calendar, Document, Edit } from "@element-plus/icons-vue";
import { ref } from "vue";
import { useQuery } from "@tanstack/vue-query";
import { useAuthStore } from "../../../stores/auth";
import { getQuizzes } from "../../../services/quiz";

const authStore = useAuthStore();
const quizStore = useQuizStore();
const quizes = ref(quizStore?.quizes);

const { isLoading, data } = useQuery({
  queryKey: ["quizes"],
  queryFn: () => getQuizzes(authStore.user.token),
  enabled: !!authStore?.user,
});
</script>

<template>
  <div class="quiz-container">
    <h1 class="quiz-title">your quizes</h1>
    <NuxtLink to="/user/quizes/new"
      ><ElButton type="success" :icon="Edit">create a quiz</ElButton></NuxtLink
    >
    <QuizCards :loading="isLoading" v-if="authStore.user" :quizes="data" />
    <QuizCards v-else :quizes="quizes" />

    <el-card shadow="hover" v-if="quizes?.length == 0 || data?.length == 0">
      <el-alert :closable="false" effect="dark" title="your quizzes are empty." type="warning" />
    </el-card>
    <el-card shadow="hover" v-else-if="!quizes?.length || data?.length == 0">
      <el-alert :closable="false" title="error finding your quizes." type="error" />
    </el-card>
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
