<script lang="ts" setup>
import { Position } from "@element-plus/icons-vue";
import { ref, defineEmits } from "vue";

const emit = defineEmits(["onSourceSelect"]);

const input = ref("");

const handleGenerateQuiz = () => {
  emit("onSourceSelect", input.value);
};
</script>

<template>
  <div>
    <el-input clearable v-model="input" style="width: 240px" placeholder="ex: cats" />
    <el-button :disabled="!input" type="success" @click="handleGenerateQuiz" :icon="Position"
      >Next</el-button
    >
  </div>
</template>

<style scoped></style>
