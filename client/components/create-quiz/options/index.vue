<script lang="ts" setup>
import { Files, VideoPlay, Notebook, Cpu } from "@element-plus/icons-vue";
import { defineEmits, ref } from "vue";

const emit = defineEmits(["onOptionClick"]);

const selectedOption = ref("ai");

const handleOptionClick = (option: any) => {
  if (option.disabled) return;
  emit("onOptionClick", option.key);
  selectedOption.value = option.key;
};

const promptOptions: any = [
  {
    key: "ai",
    label: "generate with AI",
    type: "primary",
    icon: Cpu,
    disabled: false,
  },
  {
    key: "doc",
    label: "upload document",
    type: "success",
    icon: Files,
    disabled: true,
  },
  {
    key: "video",
    label: "from youtube video",
    type: "warning",
    icon: VideoPlay,
    disabled: true,
  },
  {
    key: "text",
    label: "from text",
    type: "danger",
    icon: Notebook,
    disabled: true,
  },
];
</script>

<template>
  <div class="options-container">
    <el-tag
      v-for="option in promptOptions"
      :key="option.key"
      :type="option.type"
      :effect="selectedOption === option.key ? 'dark' : 'light'"
      round
      @click="handleOptionClick(option)"
      :class="{ 'option-item': true, 'option-disabled': option.disabled }"
    >
      <div>
        <el-icon><component :is="option.icon" /></el-icon>
        {{ option.label }}
      </div>
    </el-tag>
  </div>
</template>

<style lang="scss" scoped>
.options-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: 0 auto;
  margin-top: 20px;
  gap: 1rem;
}

.option-disabled {
  opacity: 0.8;
  cursor: not-allowed !important;
}

.el-tag {
  --el-icon-size: 20px;
  height: 50px;

  div {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
    padding: 5px;
  }
}

.option-item:hover {
  cursor: pointer;
}
</style>
