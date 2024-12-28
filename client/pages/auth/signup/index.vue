<script setup lang="ts">
import { ElMessage, type FormRules, type FormInstance } from "element-plus";
import { reactive, ref } from "vue";

interface RuleForm {
  username: string;
  email: string;
  password: string;
}

const ruleFormRef = ref<FormInstance>();
const signupForm = reactive<RuleForm>({
  username: "",
  email: "",
  password: "",
});

const rules = reactive<FormRules<RuleForm>>({
  username: [
    {
      required: true,
      message: "Please input username",
      trigger: "blur",
    },
    {
      min: 4,
      message: "Username length should be at least 4 characters",
      trigger: "blur",
    },
  ],
  email: [
    {
      required: true,
      message: "Please input email address",
      trigger: "blur",
    },
    {
      type: "email",
      message: "Please input correct email address",
      trigger: ["blur", "change"],
    },
  ],
  password: [
    {
      required: true,
      message: "Please input password",
      trigger: "blur",
    },
    {
      min: 6,
      message: "Password length should be at least 6 characters",
      trigger: "blur",
    },
  ],
});

const handleSignUp = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
    } else {
      ElMessage({
        showClose: true,
        message: "Please fill out all fields.",
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
      style="max-width: 600px"
    >
      <el-form-item prop="username" label="@username" label-position="top">
        <el-input v-model="signupForm.username" />
      </el-form-item>
      <el-form-item prop="email" label="Email">
        <el-input v-model="signupForm.email" />
      </el-form-item>
      <el-form-item prop="password" label="password" label-position="top">
        <el-input type="password" v-model="signupForm.password" />
      </el-form-item>
      <el-form-item>
        <el-button @click="handleSignUp(ruleFormRef)" type="success">sign up</el-button>
      </el-form-item>
    </el-form>
    <p>already have an account? <NuxtLink to="/auth/login">login</NuxtLink></p>
  </div>
</template>

<style scoped>
.form-container {
  max-width: 600px;
  margin: 0 auto;
}
</style>
