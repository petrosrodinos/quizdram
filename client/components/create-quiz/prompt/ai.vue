<script lang="ts" setup>
import { ref } from "vue";
import { Cpu, MagicStick } from "@element-plus/icons-vue";
import { useQuizStore } from "../../../stores/quiz";

const emit = defineEmits(["onPromptSelected"]);

const quizStore = useQuizStore();

const savedPrompt = ref(quizStore.quizSettings?.prompt || "");

const input = ref(savedPrompt.value);

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
          <el-button :icon="MagicStick" :disabled="!input" @click="handlePromptSelected" />
        </template>
      </el-input>
    </div>
  </div>
</template>

<style scoped></style>
