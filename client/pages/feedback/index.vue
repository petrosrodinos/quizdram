<script setup lang="ts">
import { ElMessage, type FormRules, type FormInstance } from "element-plus";
import { reactive, ref } from "vue";
import { useMutation } from "@tanstack/vue-query";
import { useAuthStore } from "../../stores/auth";
import { useReview } from "../../composables/api/useReview";
import type { NewReview } from "../../interfaces/review";

const authStore = useAuthStore();

const { createReview } = useReview();

const ruleFormRef = ref<FormInstance>();
const reviewForm = reactive<NewReview>({
  username: authStore.user?.username || "",
  email: authStore.user?.email || "",
  review: "",
});

const rules = reactive<FormRules<NewReview>>({
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
  review: [
    {
      required: true,
      message: "please type a review",
      trigger: "blur",
    },
    {
      min: 10,
      message: "review length should be at least 10 characters",
      trigger: "blur",
    },
    {
      max: 500,
      message: "review length should be at most 500 characters",
      trigger: "blur",
    },
  ],
});

const { mutate, isPending } = useMutation({
  mutationFn: createReview,
  onSuccess: async () => {
    authStore.updateUser({
      tokens: 1,
    });
    ElMessage({
      showClose: true,
      message: "review sent successfully,you got 1 quizz",
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

const handleSendReview = async (formEl: FormInstance | undefined) => {
  if (!authStore.user) {
    ElMessage({
      showClose: true,
      message: "please login to send a review",
      type: "warning",
    });
    return;
  }
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      mutate(reviewForm);
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
    <h2>give us your feedback</h2>
    <p>your review want be visible</p>
    <el-alert
      v-if="!authStore.user"
      :closable="false"
      effect="dark"
      title="create an account to send a review."
      type="warning"
    />

    <el-form
      :model="reviewForm"
      :rules="rules"
      ref="ruleFormRef"
      label-position="top"
      label-width="auto"
    >
      <el-form-item prop="username" label="@username" label-position="top">
        <el-input :disabled="true" v-model="reviewForm.username" />
      </el-form-item>
      <el-form-item prop="email" label="email">
        <el-input :disabled="true" v-model="reviewForm.email" />
      </el-form-item>
      <el-form-item prop="review" label="review" label-position="top">
        <el-input type="textarea" v-model="reviewForm.review" />
      </el-form-item>
      <el-form-item>
        <el-button :loading="isPending" @click="handleSendReview(ruleFormRef)" type="success"
          >send review</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<style scoped>
.form-container {
  max-width: 800px;
  padding-top: 10px;
  margin: 0 auto;
}
</style>
