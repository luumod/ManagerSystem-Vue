<template>
  <div class="login-panel">
    <h1 class="title">后台管理系统</h1>

    <!-- 中心内容区域-->
    <div class="tabs">
      <el-tabs type="border-card" stretch v-model="activeTab">
        <!-- 账号登录 -->
        <el-tab-pane label="账号登录" name="account">
          <!-- 具名插槽-->
          <template #label>
            <el-icon><User /></el-icon>
            <span class="text">账号登陆</span>
          </template>
          <!-- ref获取子组件的实例（获取子组件中defineExpose的方法） -->
          <LoginAccount ref="accountRef"></LoginAccount>
        </el-tab-pane>

        <!-- 手机登录 -->
        <el-tab-pane label="手机登录" name="phone" lazy>
          <template #label>
            <el-icon><Iphone /></el-icon>
            <span class="text">手机登录</span>
          </template>
          <LoginPhone></LoginPhone>
        </el-tab-pane>
      </el-tabs>
    </div>

    <!-- 底部区域 -->
    <div class="controls">
      <div class="login-assistance">
        <el-checkbox v-model="isRememberPwd" label="记住密码"></el-checkbox>
        <el-checkbox v-model="isAutoLogin" label="自动登录"></el-checkbox>
      </div>

      <el-link type="primary">忘记密码</el-link>
    </div>
    <el-button type="primary" class="login-btn" size="large" @click="handleLogin"
      >立刻登录</el-button
    >
  </div>
</template>

<script setup lang="ts" name="login-panel">
import { ref, watch } from 'vue';
import LoginAccount from '@/views/login/c-cpns/login-account.vue';
import LoginPhone from '@/views/login/c-cpns/login-phone.vue';
import { localCache } from '@/utils/cache';

const CACHE_REMEMBER_PWD = 'login/isRememberPwd';
const CACHE_AUTO_LOGIN = 'login/isAutoLogin';

const isRememberPwd = ref<boolean>(localCache.getCache(CACHE_REMEMBER_PWD) ?? false);
const isAutoLogin = ref<boolean>(localCache.getCache(CACHE_AUTO_LOGIN) ?? false);
//v-model="activeTab"
const activeTab = ref<string>('account');

// 自动登录与记住密码之间的逻辑
watch(isAutoLogin, (isAuto) => {
  if (isAuto) {
    localCache.setCache(CACHE_AUTO_LOGIN, true);
    isRememberPwd.value = true;
  } else {
    localCache.removeCache(CACHE_AUTO_LOGIN);
  }
});
watch(isRememberPwd, (isRem) => {
  if (isRem) {
    localCache.setCache(CACHE_REMEMBER_PWD, isRem);
  } else {
    localCache.removeCache(CACHE_REMEMBER_PWD);
    isAutoLogin.value = false;
  }
});

//InstanceType<typeof LoginAccount> <==> LoginAccount
//获取子组件的实例：InstanceType<typeof LoginAccount>
const accountRef = ref<InstanceType<typeof LoginAccount>>();

//点击登录
function handleLogin() {
  if (activeTab.value === 'account') {
    //1. 获取子组件的实例: ref
    //2. 调用子组件的方法: loginAction
    accountRef.value?.loginAction(isRememberPwd.value); //可选链：一开始为null
  } else {
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

.login-assistance {
  justify-content: center;
}
</style>
