<script lang="ts" setup>
import { ref } from "vue";
import { useAuthStore } from "../stores/auth";

const authStore = useAuthStore();
const activeIndex = ref("1");
const handleSelect = (key: string, keyPath: string[]) => {};
</script>

<template>
  <el-menu
    :default-active="activeIndex"
    class="el-menu-demo"
    mode="horizontal"
    :ellipsis="false"
    @select="handleSelect"
    active-text-color="#ffd04b"
  >
    <el-menu-item index="0">
      <img class="image-logo" style="width: 100px" src="/assets/logo.jpg" alt="Element logo" />
    </el-menu-item>
    <el-menu-item index="1">
      <NuxtLink to="/"><el-menu-item index="1-1">home</el-menu-item></NuxtLink>
    </el-menu-item>

    <el-menu-item index="2"><NuxtLink to="/user/quizes">quizes</NuxtLink></el-menu-item>
    <NuxtLink v-if="!authStore.user" to="/auth/login">
      <el-menu-item index="3">login/sign Up</el-menu-item>
    </NuxtLink>
    <NuxtLink @click="authStore.logout()" v-else to="/auth/login"
      ><el-menu-item index="4">logout</el-menu-item></NuxtLink
    >
    <!-- <el-sub-menu index="3">
      <template #title>Workspace</template>
      <el-menu-item index="3-1">item one</el-menu-item>
      <el-menu-item index="3-2">item two</el-menu-item>
      <el-menu-item index="3-3">item three</el-menu-item>
      <el-sub-menu index="2-4">
        <template #title>item four</template>
        <el-menu-item index="2-4-1">item one</el-menu-item>
        <el-menu-item index="2-4-2">item two</el-menu-item>
        <el-menu-item index="2-4-3">item three</el-menu-item>
      </el-sub-menu>
    </el-sub-menu> -->
  </el-menu>
</template>

<style scoped>
a {
  text-decoration: none;
}
template {
  font-family: Roboto, sans-serif;
}
.el-menu--horizontal > .el-menu-item:nth-child(1) {
  margin-right: auto;
}

.image-logo {
  border-radius: 50px;
  width: 30px;
  height: 60px;
  margin-bottom: 10px;
}
</style>
