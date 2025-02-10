<template>
  <div class="login-panel">
    <h1 class="title">后台管理系统</h1>

    <!-- 中心内容区域-->
    <div class="tabs">
      <el-tabs type="border-card" stretch v-model="activeName">
        <el-tab-pane label="账号登录" name="account">
          <template #label>
            <el-icon><User /></el-icon>
            <span class="text">账号登陆</span>
          </template>
          <div>账号</div>
          <div>密码</div>
        </el-tab-pane>
        <el-tab-pane label="手机登录" name="phone">
          <template #label>
            <el-icon><Iphone /></el-icon>
            <span class="text">手机登录</span>
          </template>
          <div>手机号</div>
          <div>验证码</div>
        </el-tab-pane>
      </el-tabs>
    </div>

    <!-- 底部区域 -->
    <div class="controls">
      <el-checkbox v-model="isRememberPwd" label="记住密码"></el-checkbox>
      <el-link type="primary">忘记密码</el-link>
    </div>
    <el-button type="primary" class="login-btn" size="large" @click="handleLogin"
      >立刻登录</el-button
    >
  </div>
</template>

<script setup lang="ts" name="login-panel">
import { ref } from 'vue';

const isRememberPwd = ref(false);

//v-model="activeName"
const activeName = ref<string>('account');
function handleLogin() {
  if (activeName.value === 'account') {
    console.log('账号登录');
  } else {
    console.log('手机登录');
  }
}
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
