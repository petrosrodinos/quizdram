<script setup lang="ts">
import { ElMessage, type FormRules, type FormInstance } from "element-plus";
import { computed, reactive, ref } from "vue";
import { useMutation } from "@tanstack/vue-query";
import { signUp } from "../../../services/auth";
import type { SignUp, LoggedUser } from "../../../interfaces/auth";
import { useAuthStore } from "../../../stores/auth";
import { navigateTo } from "nuxt/app";
import { useRoute } from "vue-router";

const authStore = useAuthStore();
const route = useRoute();

const query = route.query;
const redirect = query.redirect as string | undefined;

const ruleFormRef = ref<FormInstance>();
const signupForm = reactive<SignUp>({
  username: "",
  email: "",
  password: "",
});

const getLoginUrl = computed(() => {
  return redirect ? `/auth/login?redirect=${encodeURIComponent(redirect)}` : "/auth/login";
});

const rules = reactive<FormRules<SignUp>>({
  username: [
    {
      required: true,
      message: "please input username",
      trigger: "blur",
    },
    {
      min: 4,
      message: "username length should be at least 4 characters",
      trigger: "blur",
    },
  ],
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

const { mutate, isPending } = useMutation({
  mutationFn: signUp,
  onSuccess: async (data: LoggedUser) => {
    authStore.setUser(data);
    if (redirect) {
      await navigateTo(redirect);
    } else {
      await navigateTo("/user/quizzes");
    }
    ElMessage({
      showClose: true,
      message: "sign up successfully",
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

const handleSignUp = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      mutate(signupForm);
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
    <h2>sign up</h2>
    <el-form
      :model="signupForm"
      :rules="rules"
      ref="ruleFormRef"
      label-position="top"
      label-width="auto"
    >
      <el-form-item prop="username" label="@username" label-position="top">
        <el-input v-model="signupForm.username" />
      </el-form-item>
      <el-form-item prop="email" label="email">
        <el-input v-model="signupForm.email" />
      </el-form-item>
      <el-form-item prop="password" label="password" label-position="top">
        <el-input type="password" v-model="signupForm.password" />
      </el-form-item>
      <el-form-item>
        <el-button :loading="isPending" @click="handleSignUp(ruleFormRef)" type="success"
          >sign up</el-button
        >
      </el-form-item>
    </el-form>
    <p>already have an account? <NuxtLink :to="getLoginUrl">login</NuxtLink></p>
  </div>
</template>

<style scoped>
.form-container {
  max-width: 800px;

  margin: 0 auto;
}
</style>
