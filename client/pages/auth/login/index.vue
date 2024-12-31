<script setup lang="ts">
import { ElMessage, type FormRules, type FormInstance } from "element-plus";
import { reactive, ref } from "vue";
import { useMutation } from "@tanstack/vue-query";
import { logIn } from "../../../services/auth";
import type { Login, User } from "../../../interfaces/auth";
import { useAuthStore } from "../../../stores/auth";
import { navigateTo } from "nuxt/app";

const authStore = useAuthStore();

const ruleFormRef = ref<FormInstance>();
const loginForm = reactive<Login>({
  email: "",
  password: "",
});

const rules = reactive<FormRules<Login>>({
  email: [
    {
      required: true,
      message: "please input email address",
      trigger: "blur",
    },
    {
      type: "email",
      message: "please input correct email address",
      trigger: ["blur", "change"],
    },
  ],
  password: [
    {
      required: true,
      message: "please input password",
      trigger: "blur",
    },
    {
      min: 6,
      message: "password length should be at least 6 characters",
      trigger: "blur",
    },
  ],
});

const { mutate } = useMutation({
  mutationFn: logIn,
  onSuccess: async (data: User) => {
    authStore.setUser(data);
    await navigateTo("/user/quizes");

    ElMessage({
      showClose: true,
      message: "login successfully",
      type: "success",
    });
  },
  onError: (err) => {
    ElMessage({
      showClose: true,
      message: err.message,
      type: "error",
    });
  },
});

const handleLogin = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      mutate(loginForm);
    } else {
      ElMessage({
        showClose: true,
        message: "please fill out all fields.",
        type: "warning",
      });
    }
  });
};
</script>

<template>
  <div class="form-container">
    <h2>login</h2>
    <el-form
      :model="loginForm"
      :rules="rules"
      ref="ruleFormRef"
      label-position="top"
      label-width="auto"
    >
      <el-form-item prop="email" label="email">
        <el-input v-model="loginForm.email" />
      </el-form-item>

      <el-form-item prop="password" label="password" label-position="top">
        <el-input type="password" v-model="loginForm.password" />
      </el-form-item>
      <el-form-item>
        <el-button @click="handleLogin(ruleFormRef)" type="success">login</el-button>
      </el-form-item>
    </el-form>
    <p>don't have an account? <NuxtLink to="/auth/signup">sign up</NuxtLink></p>
  </div>
</template>

<style scoped>
.form-container {
  max-width: 800px;
  margin: 0 auto;
  width: 100%;
}
</style>
