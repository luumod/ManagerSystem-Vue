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

      <el-form-item label="性别" prop="gender">
        <el-radio-group v-model="userAccount.gender">
          <el-radio value="男">男</el-radio>
          <el-radio value="女">女</el-radio>
          <el-radio value="未知">未知</el-radio>
        </el-radio-group>
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
  password: '',
  gender: ''
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
  ],
  gender: [{ required: true, message: '请选择性别', trigger: 'blur' }]
};

//获取form
const formRef = ref<InstanceType<typeof ElForm>>();

//执行账号登录逻辑
function loginAction() {
  console.log('loginAction', userAccount.account, userAccount.password, userAccount.gender); //利用axios发送请求
  if (!formRef.value) {
    return;
  }
  formRef.value?.validate((valid) => {
    if (valid) {
      ElMessage.success('qwe, 正在准备登录~');
    } else {
      ElMessage.error('Oops, 信息格式输入错误.');
    }
  });
}
//向外部暴露实例属性，以便父组件可以通过ref获取实例对象后，调用该属性
defineExpose({
  loginAction
});
</script>

<style scoped>
.login-account {
  color: red;
}
</style>
