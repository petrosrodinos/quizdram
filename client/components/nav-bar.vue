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

    <el-menu-item class="menu-item-large" index="1">
      <NuxtLink to="/">home</NuxtLink>
    </el-menu-item>

    <el-menu-item v-if="authStore.user" class="menu-item-large" index="2"
      ><NuxtLink to="/user/quizes">quizes</NuxtLink></el-menu-item
    >

    <el-menu-item class="menu-item-large nav-item-right">
      <NuxtLink v-if="!authStore.user" to="/auth/login">signin</NuxtLink>
      <NuxtLink v-else @click="authStore.logout()" to="/auth/login"> logout </NuxtLink>
    </el-menu-item>

    <el-sub-menu class="menu-item-small" index="1">
      <template #title>menu</template>
      <el-menu-item index="1-1">
        <NuxtLink to="/">home</NuxtLink>
      </el-menu-item>
      <el-menu-item index="1-2"><NuxtLink to="/user/quizes">quizes</NuxtLink></el-menu-item>

      <el-menu-item index="1-3">
        <NuxtLink v-if="!authStore.user" to="/auth/login">sign in</NuxtLink>
        <NuxtLink v-else @click="authStore.logout()" to="/auth/login">logout</NuxtLink>
      </el-menu-item>
    </el-sub-menu>
  </el-menu>
</template>

<style lang="scss" scoped>
a {
  text-decoration: none;
}

.el-menu--horizontal {
  display: flex;
  align-items: center;
}

.nav-item-right {
  margin-left: auto;
}

.el-menu-item {
  a {
    color: black;
  }
}

.image-logo {
  border-radius: 50px;
  width: 30px;
  height: 30px;
  // margin-bottom: 10px;
  margin: 20px;
}

.menu-item-large {
  display: block;
}

.menu-item-small {
  display: none;
}

@media screen and (max-width: 440px) {
  .menu-item-large {
    display: none;
  }

  .menu-item-small {
    display: block;
  }
}
</style>
