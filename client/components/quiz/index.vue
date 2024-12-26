<script lang="ts" setup>
import type { Question } from "../../interfaces/quiz";
import { ref } from "vue";

const { quiz } = defineProps<{
  quiz: Question[];
}>();

const selectedAnswers = ref<string[]>(Array(quiz.length).fill(""));
</script>

<template>
  <div>
    <div v-for="(question, index) in quiz" :key="index">
      <el-card class="mb-3">
        <div slot="header">
          <h3>{{ question.question }}</h3>
        </div>

        <template v-if="question.type === 'multiple'">
          <el-radio-group v-model="selectedAnswers[index]">
            <el-radio v-for="(option, i) in question.answers" :key="i" :label="option">
              {{ option }}
            </el-radio>
          </el-radio-group>
        </template>

        <template v-else-if="question.type === 'boolean'">
          <el-radio-group v-model="selectedAnswers[index]">
            <el-radio :label="'true'">True</el-radio>
            <el-radio :label="'false'">False</el-radio>
          </el-radio-group>
        </template>
      </el-card>
    </div>
  </div>
</template>

<style scoped>
.mb-3 {
  margin-bottom: 1rem;
}
</style>
