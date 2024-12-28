<script setup lang="ts">
import { ElMessage, type FormRules, type FormInstance } from "element-plus";
import { reactive, ref } from "vue";

interface RuleForm {
  email: string;
  password: string;
}

const ruleFormRef = ref<FormInstance>();
const loginForm = reactive<RuleForm>({
  email: "",
  password: "",
});

const rules = reactive<FormRules<RuleForm>>({
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

const handleLogin = async (formEl: FormInstance | undefined) => {
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
    <h2>login</h2>
    <el-form
      :model="loginForm"
      :rules="rules"
      ref="ruleFormRef"
      label-position="top"
      label-width="auto"
      style="max-width: 600px"
    >
      <el-form-item prop="email" label="Email">
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
  max-width: 600px;
  margin: 0 auto;
}
</style>
