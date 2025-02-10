<template>
  <div class="login-account">
    <el-form
      label-width="60px"
      ref="formRef"
      :model="userAccount"
      :rules="accountRules"
      status-icon
    >
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
import { reactive, ref } from 'vue';
import { ElMessage } from 'element-plus';
import type { ElForm, FormRules } from 'element-plus';

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

//获取form
const formRef = ref<InstanceType<typeof ElForm>>();

//执行账号登录逻辑
function loginAction() {
  console.log('loginAction', userAccount.account, userAccount.password); //利用axios发送请求
  if (!formRef.value) {
    return;
  }
  formRef.value?.validate((valid) => {
    if (valid) {
      console.log('验证通过');
    } else {
      console.log('验证失败');
      ElMessage.error('Oops, 账号或密码输入格式错误.');
    }
  });
}
defineExpose({
  loginAction
});
</script>

<style scoped>
.login-account {
  color: red;
}
</style>
