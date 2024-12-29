<script setup lang="ts">
import { useAuthStore } from "../../../stores/auth";

const authStore = useAuthStore();
</script>

<template>
  <div>
    <ElCard shadow="always" class="custom-card">
      <h2>history</h2>
      <el-alert
        v-if="!authStore.user"
        :closable="false"
        effect="dark"
        title="create an account to start logging history."
        type="warning"
      />
      <el-alert
        v-else-if="authStore.user"
        :closable="false"
        effect="dark"
        title="there is no history for this quiz."
        type="warning"
      />
      <el-alert
        v-else
        :closable="false"
        effect="dark"
        title="could not get quiz history."
        type="error"
      />
    </ElCard>
  </div>
</template>

<style scoped>
.custom-card {
  margin-top: 10px;
  margin-bottom: 10px;
  width: 100%;
}
</style>
