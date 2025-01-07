<script lang="ts" setup>
import { useAutoLogout } from "../composables/useAutoLogout";

useAutoLogout();
</script>

<template>
  <div>
    <NavBar />

    <slot />
  </div>
</template>

<style scoped>
div {
  margin-left: 5px;
  margin-right: 5px;
}
</style>
