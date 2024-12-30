<script lang="ts" setup>
import { Files, VideoPlay, Notebook, Cpu } from "@element-plus/icons-vue";
import { defineEmits } from "vue";

const emit = defineEmits(["onOptionClick"]);

const handleOptionClick = (option: string) => {
  emit("onOptionClick", option);
};
</script>

<template>
  <div class="options-container">
    <div @click="handleOptionClick('ai')" class="option-item">
      <el-text class="mx-1" size="large">generate your own with AI</el-text>
      <el-icon><Cpu /></el-icon>
    </div>
    <div @click="handleOptionClick('doc')" class="option-item">
      <el-text class="mx-1" size="large">upload document</el-text>
      <el-icon><Files /></el-icon>
    </div>

    <div @click="handleOptionClick('video')" class="option-item">
      <el-text class="mx-1" size="large">from youtube video</el-text>
      <el-icon><VideoPlay /></el-icon>
    </div>
    <div @click="handleOptionClick('text')" class="option-item">
      <el-text class="mx-1" size="large">from text</el-text>
      <el-icon><Notebook /></el-icon>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.options-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  max-width: 900px;
  margin: 0 auto;
  gap: 1rem;
}

.option-item {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  flex-direction: column;
  padding: 1rem;
  margin: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #ffd04b;

  span {
    color: black;
  }
}

.option-item:last-child {
  grid-column: span 3;
  justify-self: center;
  max-width: 200px;
  width: 100%;
}

@media screen and (max-width: 500px) {
  .options-container {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media screen and (max-width: 470px) {
  .options-container {
    grid-template-columns: 1fr;
    gap: 0.5rem;
  }

  .option-item {
    padding: 0.5rem;
    margin: 0.5rem;
  }

  .option-item:last-child {
    grid-column: span 1;
    max-width: 100%;
  }
}

.option-item:hover {
  background-color: #ffdd80;
  cursor: pointer;
}
</style>
