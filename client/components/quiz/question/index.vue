<script setup lang="ts">
import { ref, defineEmits, watch } from "vue";
import type { Question } from "../../../interfaces/quiz";
import { Edit, CircleClose, CircleCheck } from "@element-plus/icons-vue";

const { question, answer, edit, disabled, correct, resultPage } = defineProps<{
  question: Question;
  answer?: string;
  edit?: boolean;
  disabled?: boolean;
  correct?: boolean;
  resultPage?: boolean;
}>();

const emit = defineEmits(["onAnswerChange"]);

const selectedAnswer = ref<string>(answer || "");

const handleAnswerChange = () => {
  emit("onAnswerChange", selectedAnswer.value);
};

watch(
  () => answer,
  (newAnswer) => {
    selectedAnswer.value = newAnswer || "";
  }
);

const dialogFormVisible = ref(false);

const handleToggleDialog = () => {
  dialogFormVisible.value = !dialogFormVisible.value;
};
</script>

<template>
  <div>
    <el-card
      class="mb-3"
      :class="{ 'success-card': resultPage && correct, 'fail-card': resultPage && !correct }"
    >
      <div slot="header">
        <el-button
          @click="handleToggleDialog"
          v-if="edit"
          class="question-button"
          type="success"
          :icon="Edit"
          circle
          :disabled="true"
        />
        <div class="question-button" v-if="resultPage">
          <el-icon class="result-success" v-if="correct"><CircleCheck /></el-icon>
          <el-icon class="result-fail" v-else><CircleClose /></el-icon>
        </div>
        <h3>{{ question.question }}</h3>
        <p v-if="resultPage">
          correct: {{ question.answers?.[parseInt(question.correct)] || question.correct }}
        </p>
      </div>

      <template v-if="question.type === 'multiple'">
        <el-radio-group :disabled="disabled" @change="handleAnswerChange" v-model="selectedAnswer">
          <el-radio v-for="(option, i) in question.answers" :key="i" :label="option">
            {{ option }}
          </el-radio>
        </el-radio-group>
      </template>

      <template v-else-if="question.type === 'boolean'">
        <el-radio-group :disabled="disabled" @change="handleAnswerChange" v-model="selectedAnswer">
          <el-radio :label="'true'">True</el-radio>
          <el-radio :label="'false'">False</el-radio>
        </el-radio-group>
      </template>
    </el-card>
    <QuizQuestionEditModal
      :visible="dialogFormVisible"
      @update:visible="dialogFormVisible = $event"
    />
  </div>
</template>

<style scoped lang="scss">
.question-button {
  float: right;
}

.result-success {
  color: green;
  width: 30px !important;
}

.result-fail {
  color: red;
  width: 30px;
}

.success-card {
  border-color: green;
}

.fail-card {
  border-color: red;
}

.mb-3 {
  margin-bottom: 1rem;
}
</style>
