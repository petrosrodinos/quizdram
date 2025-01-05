<script lang="ts" setup>
import { defineProps, defineEmits, computed, type PropType } from "vue";
import type { Quiz } from "../../../../interfaces/quiz";
import { FRONT_END_URL } from "../../../../utils/constants";

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
    title="Share the quiz"
  >
    <h3>Send the link to your friends</h3>
    <p class="share-link">{{ FRONT_END_URL }}/quizzes/{{ quiz.id }}</p>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="handleClose">Cancel</el-button>
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
