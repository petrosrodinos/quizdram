<script lang="ts" setup>
import { defineProps, defineEmits, computed, type PropType } from "vue";
import type { Quiz } from "../../../../interfaces/quiz";
import { useRuntimeConfig } from "nuxt/app";

const { visible, quiz } = defineProps({
  visible: {
    type: Boolean,
    required: true,
  },
  quiz: {
    type: Object as PropType<Quiz>,
    required: true,
  },
});

const config = useRuntimeConfig();

const emit = defineEmits(["update:visible"]);

const dialogVisible = computed({
  get: () => visible,
  set: (val: boolean) => emit("update:visible", val),
});

const handleClose = () => {
  dialogVisible.value = false;
};
</script>

<template>
  <el-dialog
    :model-value="dialogVisible"
    @update:model-value="dialogVisible = $event"
    title="share the quiz"
  >
    <h3>send the link to your friends</h3>
    <p class="share-link">{{ config.public.frontEndUrl }}/quizzes/{{ quiz.id }}</p>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="handleClose">cancel</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<style lang="scss" scoped>
.dialog-footer {
  display: flex;
  justify-content: flex-end;
}

.share-link {
  color: #ffd04b;
}

// .share-link:hover {
//   cursor: pointer;
// }
</style>
