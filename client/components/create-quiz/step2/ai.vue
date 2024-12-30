<script lang="ts" setup>
import { ref } from "vue";
import { Search } from "@element-plus/icons-vue";
import { Cpu } from "@element-plus/icons-vue";

const emit = defineEmits(["onPromptSelected"]);

const input = ref("");

const handlePromptSelected = () => {
  emit("onPromptSelected", input.value);
};
</script>

<template>
  <div>
    <div class="mt-4">
      <el-input
        v-model="input"
        placeholder="ex: cats"
        class="input-with-select"
        :prefix-icon="Cpu"
        size="large"
      >
        <template #append>
          <el-button :icon="Search" :disabled="!input" @click="handlePromptSelected" />
        </template>
      </el-input>
    </div>
  </div>
</template>

<style scoped></style>
