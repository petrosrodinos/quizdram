<script lang="ts" setup>
import { ref } from "vue";

const emit = defineEmits(["onPromptChange"]);

const input = ref("");

const handlePromptChange = (value: string) => {
  emit("onPromptChange", value);
};
</script>

<template>
  <div>
    <el-input @input="handlePromptChange" clearable v-model="input" placeholder="ex: cats" />
  </div>
</template>

<style scoped></style>
