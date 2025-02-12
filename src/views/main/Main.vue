<template>
  <div class="main">
    <!-- <button @click="exitLogin">退出登录</button> -->
    <el-container class="main-content">
      <el-aside width="240px">
        <main-menu></main-menu>
      </el-aside>
      <el-container>
        <el-header height="60px">
          <main-header></main-header>
        </el-header>
        <el-main>Main</el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts" name="main">
// import { LOGIN_TOKEN } from '@/global/constants';
// import router from '@/router';
// import { localCache } from '@/utils/cache';
// function exitLogin() {
//   //1. 清除token
//   localCache.removeCache(LOGIN_TOKEN);
//   //2. 跳转到登录页面
//   router.push('/login');
// }

import MainMenu from '@/components/main-menu/main-menu.vue';
import MainHeader from '@/components/main-header/main-header.vue';
</script>

<style scoped lang="less">
.main {
  color: red;
  height: 100%;
}

.main-content {
  height: 100%;

  .el-aside {
    background-color: antiquewhite;
  }

  .el-header {
    background-color: aquamarine;
  }

  .el-main {
    background-color: burlywood;
  }
}
</style>
