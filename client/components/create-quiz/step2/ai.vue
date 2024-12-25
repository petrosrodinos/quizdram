<script lang="ts" setup>
import { Position } from "@element-plus/icons-vue";
import { ref, defineEmits } from "vue";

const emit = defineEmits(["onSettingsSelect"]);

const input = ref("");

const handleGenerateQuiz = () => {
  const quizSettings = {
    prompt: input.value,
    source: "ai",
    difficulty: "easy",
    category: "multiple",
  };
  emit("onSettingsSelect", quizSettings);
};
</script>

<template>
  <div>
    <el-input clearable v-model="input" style="width: 240px" placeholder="ex: cats" />
    <el-button :disabled="!input" type="success" @click="handleGenerateQuiz" :icon="Position"
      >Create</el-button
    >
  </div>
</template>

<style scoped></style>
