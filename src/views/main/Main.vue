<template>
  <div class="main">
    <button @click="exitLogin">退出登录</button>
  </div>
</template>

<script setup lang="ts" name="main">
import { LOGIN_TOKEN } from '@/global/constants';
import router from '@/router';
import { localCache } from '@/utils/cache';

function exitLogin() {
  //1. 清除token
  localCache.removeCache(LOGIN_TOKEN);
  //2. 跳转到登录页面
  router.push('/login');
}
</script>

<style scoped>
.main {
  color: red;
}
</style>
