<template>
  <div class="login-account">
    <el-form label-width="60px" :model="userAccount" :rules="accountRules" status-icon>
      <el-form-item label="账号" prop="account">
        <el-input v-model="userAccount.account" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input show-password v-model="userAccount.password" />
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts" name="login-account">
import { reactive } from 'vue';
import type { FormRules } from 'element-plus';

//定义account数据
const userAccount = reactive({
  account: '',
  password: ''
});
//定义校验规则
const accountRules: FormRules = {
  account: [
    { required: true, message: '请输入账号', trigger: 'blur' },
    { pattern: /^[a-zA-Z0-9]{6,20}$/, message: '必须是6-20位的数字或字母组成', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { pattern: /^[a-zA-Z0-9]{6,20}$/, message: '密码长度必须在6-20位之间', trigger: 'blur' }
  ]
};
</script>

<style scoped>
.login-account {
  color: red;
}
</style>
