<script lang="ts" setup>
import type { Quiz } from "../../../interfaces/quiz";

const { data, error, isLoading } = defineProps<{
  data: Quiz;
  error: any;
  isLoading: boolean;
}>();
</script>

<template>
  <div>
    <h2 v-if="data">quiz generated successfully</h2>
    <Quiz v-if="data" :quiz="data" :edit="true" />
    <el-alert v-if="(error || !data) && !isLoading" title="could not generate quiz" type="error" />
    <p v-else-if="isLoading">generating quiz...</p>
  </div>
</template>

<style scoped>
div {
  margin-top: 20px;
}
</style>
