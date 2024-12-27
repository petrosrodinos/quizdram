<script setup lang="ts">
import { ref, defineEmits, watch } from "vue";
import type { Question } from "../../interfaces/quiz";

const { question, answer } = defineProps<{
  question: Question;
  answer?: string;
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
</script>

<template>
  <div>
    <el-card class="mb-3">
      <div slot="header">
        <h3>{{ question.question }}</h3>
        <p>{{ question.correct }}</p>
      </div>

      <template v-if="question.type === 'multiple'">
        <el-radio-group @change="handleAnswerChange" v-model="selectedAnswer">
          <el-radio v-for="(option, i) in question.answers" :key="i" :label="option">
            {{ option }}
          </el-radio>
        </el-radio-group>
      </template>

      <template v-else-if="question.type === 'boolean'">
        <el-radio-group @change="handleAnswerChange" v-model="selectedAnswer">
          <el-radio :label="'true'">True</el-radio>
          <el-radio :label="'false'">False</el-radio>
        </el-radio-group>
      </template>
    </el-card>
  </div>
</template>

<style scoped>
.mb-3 {
  margin-bottom: 1rem;
}
</style>
