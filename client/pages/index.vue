<script lang="ts" setup>
import { useQuery } from "@tanstack/vue-query";
import { getQuizzes } from "../services/quiz";

const { isLoading, data, error } = useQuery({
  queryKey: ["quizes"],
  queryFn: () => getQuizzes(),
});
</script>

<template>
  <div class="home-container">
    <div class="home-content">
      <CreateQuiz>
        <span>
          Generate personalized quizzes with AI in seconds! Share with friends and compete for the
          top spot—fun, fast, and interactive!
        </span>
      </CreateQuiz>
    </div>
    <div class="quiz-cards">
      <h2>Try out some of our user's favorite quizzes!</h2>
      <UiSpinner v-if="isLoading" />
      <QuizCards v-if="data" :quizes="data" :isPublic="true" />
      <el-alert
        v-if="(error || data?.length === 0) && !isLoading"
        :closable="false"
        effect="dark"
        title="no quizzes found, Please try again later."
        type="warning"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.home-container {
  height: 92.5vh;
  margin-top: 2px;
  background: rgb(34, 193, 195);
  background: linear-gradient(70deg, rgba(34, 193, 195, 1) 0%, rgba(253, 187, 45, 1) 81%);
  width: 100%;
}

.home-content {
  padding-top: 100px;

  span {
    font-size: 24px;
    font-weight: 400;
    margin: 20px;
    color: white;
    text-align: center;
    max-width: 750px;
  }
}

.quiz-cards {
  position: relative;
  top: 25%;
  background: rgb(34, 193, 195);
  background: linear-gradient(70deg, rgba(34, 193, 195, 1) 0%, rgba(253, 187, 45, 1) 81%);
  margin-top: 10px;

  h2 {
    color: white;
    text-align: center;
  }
}

.el-alert {
  margin: 0 auto;
  width: 40%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
