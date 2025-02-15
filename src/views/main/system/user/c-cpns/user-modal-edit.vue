<template>
  <div class="user-modal-edit">
    <el-dialog v-model="dialogVisible" title="编辑用户" width="30%" center>
      <div class="form">
        <el-form :model="formData" ref="formRef" status-icon label-width="100px">
          <el-form-item label="账号" prop="user_account">
            <el-input
              v-model="formData.user_account"
              placeholder="账号"
              class="readonly-item"
              readonly
            ></el-input>
          </el-form-item>
          <el-form-item label="用户名" prop="user_name">
            <el-input v-model="formData.user_name" placeholder="请输入用户名"></el-input>
          </el-form-item>
          <el-form-item label="性别" prop="gender">
            <el-select v-model="formData.gender" placeholder="请选择性别">
              <el-option label="男" :value="1"></el-option>
              <el-option label="女" :value="2"></el-option>
              <el-option label="保密" :value="3"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="状态" prop="isEnable">
            <el-select v-model="formData.isEnable" placeholder="请选择状态">
              <el-option label="启用" :value="1"></el-option>
              <el-option label="禁用" :value="2"></el-option>
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

<script setup lang="ts" name="user-modal-edit-edit">
import useSystemStore from '@/store/main/system/system';
import type { T_queryUserData, T_updateUserInfo } from '@/store/main/system/types';
import { ElForm, ElMessage } from 'element-plus';
import { reactive, ref } from 'vue';

const dialogVisible = ref(false);
const systemStore = useSystemStore();
const formData: T_updateUserInfo = reactive({
  user_account: '',
  user_name: '',
  mobile: '',
  email: '',
  isEnable: 1,
  gender: 1
});
const edit_id = ref<number>();
const formRef = ref<InstanceType<typeof ElForm>>();

//查询条件
const qC = ref();
/**
 * 显示修改用户弹窗，并且显示用户基本信息，在查询中修改时，可以保持查询条件不变
 * @param item_data 填充的用户信息
 * @param queryCondition 查询条件
 */
function showUpdateUserDlg(item_data: any, queryCondition: T_queryUserData) {
  qC.value = queryCondition;
  dialogVisible.value = true;
  edit_id.value = item_data.id; //保存要修改的这一行的id
  const { user_account, user_name, mobile, email, isEnable, gender } = item_data;
  Object.assign(formData, { user_account, user_name, mobile, email, isEnable, gender });
}

/**
 * 点击了【确定】，发送请求，修改用户信息
 */
function handleSubmit() {
  //1. 发送请求
  systemStore
    .updateUserAction(edit_id.value!, formData, qC.value)
    .then(() => {
      //2. 显示成功提示
      ElMessage.success('修改用户信息成功！');

      //3. 关闭弹窗
      dialogVisible.value = false;

      //4. 刷新列表
      formRef.value?.resetFields();
    })
    .catch((error: any) => {
      //1. 显示失败提示
      ElMessage.error(error.message);
    });
}

defineExpose({ showUpdateUserDlg });
</script>

<style scoped lang="less">
.form {
  padding: 10px;
  margin-top: 10px;

  .readonly-item {
    :deep(.el-input__wrapper.is-focus) {
      box-shadow: 0 0 0 1px rgb(255, 33, 33) inset;
    }
  }
}
</style>
