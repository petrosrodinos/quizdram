<script lang="ts" setup>
import { Position } from "@element-plus/icons-vue";
import { ref } from "vue";
import { useMutation } from "@tanstack/vue-query";
import { generateQuiz } from "../../../services/quiz";

const { mutate } = useMutation({
  mutationFn: (newTodo: any) => generateQuiz(newTodo),
  onSuccess: async (res: any) => {
    console.log(res);
  },
});

const input = ref("");

const handleGenerateQuiz = () => {
  mutate(input.value);
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
