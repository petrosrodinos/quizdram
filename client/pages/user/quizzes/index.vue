<script setup>
import { ElCard, ElRow, ElCol } from "element-plus";
import { Calendar, Document, Edit, User, Share } from "@element-plus/icons-vue";
import { useQuery } from "@tanstack/vue-query";
import { useAuthStore } from "../../../stores/auth";
import { useTokenDialog } from "../../../composables/useTokenDialog";
import { useQuiz } from "../../../composables/api/useQuiz";

definePageMeta({
  title: "Quizzes",
  middleware: ["auth-user"],
});

const { getQuizzes } = useQuiz();

const authStore = useAuthStore();

const { showNoTokensDialog } = useTokenDialog();

const dialogFormVisible = ref(false);

const { isLoading, data, error } = useQuery({
  queryKey: ["quizes", authStore?.user?.id],
  queryFn: () => getQuizzes({ userId: authStore?.user?.id }),
  enabled: !!authStore?.user,
});

const {
  isLoading: isGettingShared,
  data: sharedData,
  error: sharedError,
} = useQuery({
  queryKey: ["shared-quizes", authStore?.user?.id],
  queryFn: () => getQuizzes({ userId: authStore?.user?.id, attempt: true }),
  enabled: !!authStore?.user,
});

const handleCreateQuiz = () => {
  if (authStore.user?.tokens === 0) {
    showNoTokensDialog();
    return;
  }
  dialogFormVisible.value = !dialogFormVisible.value;
};
</script>

<template>
  <div class="quiz-container">
    <h1 class="quiz-title">your quizes</h1>
    <ElButton @click="handleCreateQuiz" type="success" :icon="Edit">create a quiz</ElButton>

    <UiSpinner v-if="isLoading" />

    <el-tabs v-if="data || sharedData" type="border-card" class="demo-tabs">
      <el-tab-pane v-if="data">
        <template #label>
          <span class="custom-tabs-label">
            <el-icon><User /></el-icon>
            <span>personal</span>
          </span>
        </template>
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
      </el-tab-pane>
      <el-tab-pane v-if="sharedData">
        <template #label>
          <span class="custom-tabs-label">
            <el-icon><Share /></el-icon>
            <span>shared</span>
          </span>
        </template>
        <QuizCards :quizes="sharedData" isPublic="true" />
        <el-alert
          v-if="sharedData?.length == 0 && !isGettingShared"
          :closable="false"
          effect="dark"
          title="you have not attempted a shared quiz yet."
          type="warning"
        />
        <el-alert
          v-if="(sharedError || !sharedData) && !isGettingShared"
          :closable="false"
          title="error finding your quizes."
          type="error"
        />
      </el-tab-pane>
    </el-tabs>
    <CreateQuizModal :visible="dialogFormVisible" @update:visible="dialogFormVisible = $event" />
  </div>
</template>

<style lang="scss" scoped>
.quiz-container {
  button {
    margin-bottom: 10px;
  }

  a {
    text-decoration: none;
  }
}

.demo-tabs > .el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}
.demo-tabs .custom-tabs-label .el-icon {
  vertical-align: middle;
}
.demo-tabs .custom-tabs-label span {
  vertical-align: middle;
  margin-left: 4px;
}
</style>
