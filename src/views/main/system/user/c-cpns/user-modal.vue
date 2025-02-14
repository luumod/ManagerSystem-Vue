<template>
  <div class="user-modal">
    <el-dialog v-model="dialogVisible" title="新建用户" width="30%" center>
      <div class="form">
        <el-form :model="formData" ref="formRef" label-width="100px">
          <el-form-item label="账号" prop="user_account">
            <el-input v-model="formData.user_account" placeholder="请输入账号"></el-input>
          </el-form-item>
          <el-form-item label="用户名" prop="user_name">
            <el-input v-model="formData.user_name" placeholder="请输入用户名"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="formData.password" placeholder="请输入密码" show-password></el-input>
          </el-form-item>
          <el-form-item label="性别" prop="gender">
            <el-select v-model="formData.gender" placeholder="请选择性别">
              <el-option label="保密" :value="0"></el-option>
              <el-option label="男" :value="1"></el-option>
              <el-option label="女" :value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="电话" prop="mobile">
            <el-input v-model="formData.mobile" placeholder="请输入电话号码"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="formData.email" placeholder="请输入邮箱"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <template #footer>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleSubmit">确定</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts" name="user-modal">
import useSystemStore from '@/store/main/system/system';
import type { T_createUserParams } from '@/store/main/system/types';
import { ElForm, ElMessage } from 'element-plus';
import { reactive, ref } from 'vue';

const dialogVisible = ref(false);
const systemStore = useSystemStore();
const formData: T_createUserParams = reactive({
  user_account: '',
  user_name: '',
  password: '',
  mobile: '',
  email: '',
  gender: 0
});
const formRef = ref<InstanceType<typeof ElForm>>();

function setDlgVisible(val: boolean) {
  console.log('val: ', val);
  dialogVisible.value = val;
}

/**
 * 点击了【新建】，发送请求，新建一个用户
 */
async function handleSubmit() {
  try {
    //1. 发送请求
    await systemStore.createNewUserAction(formData);
    debugger;
    //2. 显示成功提示
    ElMessage.success('新建用户成功！');

    //3. 关闭弹窗
    setDlgVisible(false);

    //4. 刷新列表
    formRef.value?.resetFields();
  } catch (error: any) {
    //1. 显示失败提示
    ElMessage.error(error.message);
  }
}

defineExpose({ setDlgVisible });
</script>

<style scoped>
.form {
  padding: 10px;
  margin-top: 10px;
}
</style>
