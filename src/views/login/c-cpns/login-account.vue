<template>
  <div class="login-user_account">
    <el-form
      label-width="60px"
      ref="formRef"
      :model="userAccount"
      :rules="accountRules"
      status-icon
    >
      <el-form-item label="账号" prop="user_account">
        <el-input v-model="userAccount.user_account" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input show-password v-model="userAccount.password" />
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts" name="login-user_account">
import { reactive, ref } from 'vue';
import { ElMessage } from 'element-plus';
import type { ElForm, FormRules } from 'element-plus';
import useLoginStore from '@/store/login';
import type { IUserAccount } from '@/types';
import { localCache } from '@/utils/cache';

const LOGIN_USER_ACCOUNT = 'login/user_account';
const LOGIN_PASSWORD = 'login/password';

//定义account数据
const userAccount = reactive<IUserAccount>({
  user_account: localCache.getCache(LOGIN_USER_ACCOUNT) ?? '',
  password: localCache.getCache(LOGIN_PASSWORD) ?? ''
});
//定义校验规则
const accountRules: FormRules = {
  user_account: [
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
const loginStore = useLoginStore();

//执行账号登录逻辑
function loginAction(isRemPwd: boolean) {
  if (!formRef.value) {
    return;
  }
  formRef.value?.validate((valid) => {
    if (valid) {
      ElMessage.success('qwe, 正在准备登录~');
      //1. 获取账号密码
      const user_account = userAccount.user_account;
      const password = userAccount.password;

      //2. 发送网络请求（丢弃响应式）
      loginStore.accountLoginAction({ user_account, password }).then(() => {
        //3. 判断是否需要记住密码
        if (isRemPwd) {
          localCache.setCache(LOGIN_USER_ACCOUNT, user_account);
          localCache.setCache(LOGIN_PASSWORD, password);
        } else {
          localCache.removeCache(LOGIN_USER_ACCOUNT);
          localCache.removeCache(LOGIN_PASSWORD);
        }
      });
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
.login-user_account {
  color: red;
}
</style>
