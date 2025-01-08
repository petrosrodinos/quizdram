<script lang="ts" setup>
import { defineProps, defineEmits, computed, type PropType, ref } from "vue";
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

const copied = ref(false);

const emit = defineEmits(["update:visible"]);

const dialogVisible = computed({
  get: () => visible,
  set: (val: boolean) => emit("update:visible", val),
});

const handleClose = () => {
  dialogVisible.value = false;
};

const copyToClipboarad = () => {
  navigator.clipboard.writeText(`${config.public.frontEndUrl}/quizzes/${quiz.id}`);
  copied.value = true;

  setTimeout(() => {
    copied.value = false;
  }, 2000);
};
</script>

<template>
  <el-dialog
    :model-value="dialogVisible"
    @update:model-value="dialogVisible = $event"
    title="share the quiz"
  >
    <h3>send the link to your friends</h3>
    <el-tooltip
      class="box-item"
      effect="dark"
      :content="copied ? 'copied!' : 'click to copy'"
      placement="top"
    >
      <p @click="copyToClipboarad" class="share-link">
        {{ config.public.frontEndUrl }}/quizzes/{{ quiz.id }}
      </p>
    </el-tooltip>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="handleClose">cancel</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<style lang="scss" scoped>
.box-item {
  display: inline-block;
}
.dialog-footer {
  display: flex;
  justify-content: flex-end;
}

.share-link {
  color: #ffd04b;
}

.share-link:hover {
  cursor: pointer;
  color: pink;
}
</style>
