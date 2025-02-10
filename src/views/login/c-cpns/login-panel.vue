<template>
  <div class="login-panel">
    <h1 class="title">后台管理系统</h1>

    <!-- 中心内容区域-->
    <div class="tabs">
      <el-tabs type="border-card" stretch>
        <el-tab-pane label="账号登录"> </el-tab-pane>
        <el-tab-pane label="手机登录"> </el-tab-pane>
      </el-tabs>
    </div>

    <!-- 底部区域 -->
    <div class="controls">
      <el-checkbox v-model="isRememberPwd" label="记住密码"></el-checkbox>
      <el-link type="primary">忘记密码</el-link>
    </div>
    <el-button type="primary" class="login-btn" size="large">立刻登录</el-button>
  </div>
</template>

<script setup lang="ts" name="login-panel">
import { ref } from 'vue';

const isRememberPwd = ref(false);
</script>

<style scoped>
.login-panel {
  width: 330px;
  margin-bottom: 150px;
}
.login-panel .title {
  text-align: center;
  margin-bottom: 15px;
}

.login-panel .label {
  display: flex;
  align-items: center;
  justify-content: center;
}

.login-panel .label .text {
  margin-left: 5px;
}

.login-panel .controls {
  margin-top: 12px;
  display: flex;
  justify-content: space-between;
}
.login-panel .login-btn {
  margin-top: 10px;
  width: 100%;

  --el-button-size: 45px;
}
</style>
