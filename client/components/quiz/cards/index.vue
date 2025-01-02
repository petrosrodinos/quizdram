<script setup lang="ts">
import { ElCard, ElRow, ElCol } from "element-plus";
import { Calendar, Document, Edit, View, Trophy } from "@element-plus/icons-vue";
import { defineProps } from "vue";
import type { Quiz } from "../../../interfaces/quiz";

const { quizes, isPublic } = defineProps<{
  quizes: Quiz[];
  isPublic?: boolean;
}>();
</script>

<template>
  <div class="quiz-cards">
    <el-row v-if="quizes?.length > 0" :gutter="10">
      <el-col :xs="24" :sm="12" :md="8" :lg="8" v-for="quiz in quizes" :key="quiz.id">
        <QuizCardsContent :quiz="quiz" :isPublic="isPublic" />
      </el-col>
    </el-row>
  </div>
</template>

<style lang="scss" scoped>
.quiz-cards {
  margin-left: 2px;
  margin-right: 2px;
}
</style>
