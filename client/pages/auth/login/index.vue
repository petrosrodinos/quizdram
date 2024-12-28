<script setup lang="ts">
import { reactive } from "vue";

const formLabelAlign = reactive({
  username: "",
  password: "",
});
</script>

<template>
  <div class="form-container">
    <h2>login</h2>
    <el-form label-position="top" label-width="auto" style="max-width: 600px">
      <el-form-item label="@username" label-position="top">
        <el-input v-model="formLabelAlign.username" />
      </el-form-item>
      <el-form-item label="password" label-position="top">
        <el-input v-model="formLabelAlign.password" />
      </el-form-item>
    </el-form>
    <p>dont have an account? <NuxtLink to="/auth/login">sign up</NuxtLink></p>
  </div>
</template>

<style scoped>
.form-container {
  max-width: 600px;
  margin: 0 auto;
}
</style>
