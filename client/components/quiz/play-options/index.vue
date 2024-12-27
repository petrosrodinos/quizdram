<script setup lang="ts">
import { ElCard, ElButton } from "element-plus";
import { Edit, UserFilled, Notebook } from "@element-plus/icons-vue";
</script>

<template>
  <div>
    <ElCard shadow="always" class="custom-card">
      <h2>Play Options</h2>
      <div class="button-container">
        <ElButton type="primary" :icon="Edit">Play Quiz</ElButton>

        <ElButton type="success" :icon="UserFilled">Play with Friends</ElButton>

        <ElButton type="warning" :icon="Notebook">Create Assignment</ElButton>
      </div>
    </ElCard>
  </div>
</template>

<style lang="scss" scoped>
.custom-card {
  margin-top: 10px;
  margin-bottom: 10px;
  width: 100%;
}

.button-container {
  display: flex;
  align-content: flex-start;
  gap: 15px;

  @media screen and (max-width: 600px) {
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    button {
      width: 100%;
    }
  }
}
</style>
