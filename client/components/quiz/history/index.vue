<script setup lang="ts"></script>

<template>
  <div>
    <ElCard shadow="always" class="custom-card">
      <h2>History</h2>
      <el-alert
        :closable="false"
        effect="dark"
        title="Create an account to start logging history."
        type="warning"
      />
      <el-alert
        :closable="false"
        effect="dark"
        title="There is no history for this quiz."
        type="success"
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
