<template>
  <div class="user-modal-edit">
    <el-dialog v-model="dialogVisible" title="编辑用户" width="30%" center>
      <div class="form">
        <el-form :model="formData" ref="formRef" status-icon label-width="100px">
          <el-form-item label="头像" prop="avatar_path" class="avatar-item">
            <el-avatar :size="100" :src="imageUrl" fit="cover" />
            <el-upload
              ref="uploadRef"
              :action="uploadUrl"
              :headers="{ Authorization: `Bearer ${localCache.getCache(LOGIN_TOKEN)}` }"
              :auto-upload="true"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
            >
              <el-button type="default">
                <el-icon><Upload /></el-icon>上传头像
              </el-button>
            </el-upload>
          </el-form-item>
          <el-divider />
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
import { LOGIN_TOKEN } from '@/global/constants';
import { BASE_URL } from '@/service/config';
import useSystemStore from '@/store/main/system/system';
import type { T_queryUserData, T_updateUserInfo } from '@/store/main/system/types';
import { localCache } from '@/utils/cache';
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
  gender: 1,
  avatar_path: ''
});

/**
 * 当前正在编辑的用户id
 */
const edit_id = ref<number>();

/**
 * 获取表单实例：用于重置表单数据
 */
const formRef = ref<InstanceType<typeof ElForm>>();

/**
 * 上传头像的 URL：http://localhost:8888/user/${edit_id}/avatar
 * @usage 【el-upload】的 action 属性
 */
const uploadUrl = ref('');

/**
 * 显示用户头像的 URL：http://localhost:8888/user/${edit_id}/avatar?token=${token}&t=${Date.now()}
 * @usage 【el-avatar】的img属性
 */
const imageUrl = ref('');

//查询条件
const queryCondition = ref();

/**
 * 显示修改用户弹窗，并且显示用户基本信息，在查询中修改时，可以保持查询条件不变
 * @param item_data 填充的用户信息
 * @param qc 查询条件
 */
async function showUpdateUserDlg(item_data: any, qc: T_queryUserData) {
  //1. 加载查询条件
  queryCondition.value = qc;
  //2. 显示当前弹窗
  dialogVisible.value = true;
  //3. 保存要修改的用户的id
  edit_id.value = item_data.id; //保存要修改的这一行的id
  //4. 填充表单数据
  const { user_account, user_name, mobile, email, isEnable, gender, avatar_path } = item_data;
  Object.assign(formData, {
    user_account,
    user_name,
    mobile,
    email,
    isEnable,
    gender,
    avatar_path
  });
  uploadUrl.value = BASE_URL + `/user/${edit_id.value!}/avatar`;
  imageUrl.value = `${BASE_URL}${avatar_path}?token=${localCache.getCache(LOGIN_TOKEN)}&t=${Date.now()}`;
}

/**
 * 上传图片成功后的回调函数
 * @param response 从服务器返回的响应数据
 */
function handleAvatarSuccess(response: any) {
  //1. 获取新的头像的url（在服务器的相对路径）
  const newAvatarUrl = response.data.url;

  //2. 更新表单中的头像路径，同时更新 Store 中存储的用户头像数据
  formData.avatar_path = newAvatarUrl;
  systemStore.updateUserAvatar(edit_id.value!, newAvatarUrl);

  //3. 实时更新头像在el-avatar中的显示
  imageUrl.value = `${BASE_URL}${newAvatarUrl}?token=${localCache.getCache(LOGIN_TOKEN)}&t=${Date.now()}`;
}

/**
 * 点击了【确定】，发送请求，修改用户信息
 */
function handleSubmit() {
  //1. 发送请求
  systemStore.updateUserAction(edit_id.value!, formData, queryCondition.value).then(() => {
    //2. 显示成功提示
    ElMessage.success('修改用户信息成功！');

    //3. 刷新列表
    formRef.value?.resetFields();
  });
  dialogVisible.value = false;
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
  .avatar-item {
    display: flex;
    align-items: center;
    .el-avatar {
      margin-right: 15px;
    }
  }
}
</style>
