<script lang="ts" setup>
import { ref } from "vue";

const active = ref(0);
</script>

<template>
  <div class="create-quiz-container">
    <CreateQuizStep1 />
  </div>
</template>

<style scoped></style>
