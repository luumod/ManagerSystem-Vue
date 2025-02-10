<template>
  <div class="login">
    <LoginPage />
  </div>
</template>

<script setup lang="ts" name="login">
import LoginPage from '@/views/login/c-cpns/login-panel.vue';
</script>

<style scoped>
.login {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}
</style>
