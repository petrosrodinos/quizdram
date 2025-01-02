<script lang="ts" setup>
import { defineProps, defineEmits, computed } from "vue";

const { visible } = defineProps({
  visible: {
    type: Boolean,
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
    title="Create your quiz"
    width="90%"
  >
    <CreateQuiz>
      <span> create your personalized quiz and share it with your friends. </span>
    </CreateQuiz>
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

span {
  font-size: 24px;
  font-weight: 400;
  text-align: center;
  max-width: 750px;
}
</style>
