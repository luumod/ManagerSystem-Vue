<template>
  <div class="user-modal-edit">
    <el-dialog
      v-model="dialogVisible"
      :title="props.modalEditConfig.pageName"
      :width="props.modalEditConfig.dialogWidth ?? '50%'"
      center
    >
      <div class="form">
        <el-form
          :model="formData"
          ref="formRef"
          status-icon
          :label-width="props.modalEditConfig.labelWidth ?? '80px'"
        >
          <el-row>
            <!-- 左侧图片区域 -->
            <el-col :span="8">
              <div class="left-panel">
                <template v-for="item in props.modalEditConfig.formItems" :key="item.prop">
                  <!-- 头像区域 -->
                  <template v-if="item.type === 'avatar'">
                    <div class="avatar-wrapper" style="margin-bottom: 20px">
                      <el-avatar :size="130" :src="imageUrl" fit="cover" />
                      <el-upload
                        class="upload-btn"
                        :action="uploadUrl"
                        :headers="{ Authorization: `Bearer ${localCache.getCache(LOGIN_TOKEN)}` }"
                        :auto-upload="true"
                        :show-file-list="false"
                        :on-success="handleAvatarSuccess"
                      >
                        <el-button type="primary" plain>
                          <el-icon><Upload /></el-icon>更换头像
                        </el-button>
                      </el-upload>
                    </div>
                  </template>

                  <!-- 图片区域 -->
                  <template v-if="item.type === 'image'">
                    <div class="image-wrapper">
                      <el-image
                        style="width: 100%; max-height: 200px"
                        :src="imageUrl"
                        fit="contain"
                        :preview-src-list="[imageUrl]"
                      />
                    </div>
                  </template>
                </template>
              </div>
            </el-col>

            <!-- 右侧表单区域 -->
            <el-col :span="16">
              <div class="right-panel">
                <template v-for="item in props.modalEditConfig.formItems" :key="item.prop">
                  <template v-if="!['avatar', 'image'].includes(item.type)">
                    <el-form-item :label="item.label" :prop="item.prop">
                      <!-- 输入型组件 -->
                      <template v-if="item.type === 'input'">
                        <el-input
                          v-model="formData[item.prop]"
                          :placeholder="item.placeholder"
                          :readonly="item.read_only"
                          :class="item.read_only ? 'readonly-item' : ''"
                        />
                      </template>

                      <!-- 选择型组件 -->
                      <template v-else-if="item.type === 'select'">
                        <el-select
                          v-model="formData[item.prop]"
                          :placeholder="item.placeholder"
                          style="width: 100%"
                        >
                          <el-option
                            v-for="option in item.options"
                            :key="option.value"
                            :label="option.label"
                            :value="option.value"
                          />
                        </el-select>
                      </template>

                      <!-- 文本域 -->
                      <template v-else-if="item.type === 'textarea'">
                        <el-input
                          v-model="formData[item.prop]"
                          type="textarea"
                          :rows="4"
                          :placeholder="item.placeholder"
                        />
                      </template>
                    </el-form-item>
                  </template>
                </template>
              </div>
            </el-col>
          </el-row>
        </el-form>
      </div>

      <template #footer>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleSubmit_image">修改图片信息</el-button>
        <el-button type="primary" @click="handleSubmit_baseInfo">修改基本信息</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts" name="user-modal-edit-edit">
import { LOGIN_TOKEN } from '@/global/constants';
import { BASE_URL } from '@/service/config';
import useSystemStore from '@/store/main/system/system';
import { T_pageType } from '@/store/main/system/types';
import { localCache } from '@/utils/cache';
import { ElForm, ElMessage } from 'element-plus';
import { reactive, ref } from 'vue';

interface IProps {
  modalEditConfig: {
    pageType: T_pageType;
    dialogWidth?: string;
    pageName: string;
    labelWidth?: number;
    formItems: any[];
  };
}

const props = defineProps<IProps>();

const initialForm: any = {};
for (const item of props.modalEditConfig.formItems) {
  initialForm[item.prop] = item.initialValue ?? '';
}
const formData = reactive(initialForm);
const page_type = ref(props.modalEditConfig.pageType);
const dialogVisible = ref(false);
const systemStore = useSystemStore();

/**
 * 当前正在编辑的数据行id
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
const res_url = ref('');
const file_data = ref<File>();

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
async function showUpdateUserDlg(item_data: any, qc: any) {
  //1. 加载查询条件
  queryCondition.value = qc;
  //2. 显示当前弹窗
  dialogVisible.value = true;
  //3. 保存要修改的用户的id
  edit_id.value = item_data.id; //保存要修改的这一行的id
  //4. 填充表单数据
  Object.assign(formData, item_data);

  //上传操作（占位）：为了在el-upload中显示出选择的图片
  uploadUrl.value = BASE_URL + `/fake_upload`;

  //显示【图片/头像】：
  res_url.value = item_data.avatar_path ? item_data.avatar_path : item_data.image_path;
  imageUrl.value = `${BASE_URL}${res_url.value}?token=${localCache.getCache(LOGIN_TOKEN)}&t=${Date.now()}`;

  // systemStore.getUserAvatarAction(res_url.value).then((data: any) => {
  //   const blob = new Blob([data], { type: 'image/jpeg' }); // 或者根据图片类型选择适当的 MIME 类型

  //   // 将 Blob 转换为 File 对象
  //   const file = new File([blob], 'avatar.jpg', { type: 'image/jpeg' });

  //   // 现在你可以将 file 保存到 file_data 或用于其他操作
  //   file_data.value = file;
  //   console.log(file_data.value); // 显示 File 对象
  // });
}

/**
 * 上传图片成功后的回调函数
 * @param response 从服务器返回的响应数据
 */
function handleAvatarSuccess(response: any, uploadFile: any) {
  //1. 获取新的头像的url（在服务器的相对路径）
  //const newAvatarUrl = response.data.url;

  //2. 更新表单中的头像路径，同时更新 Store 中存储的用户头像数据
  //formData.avatar_path = newAvatarUrl;
  //systemStore.updateUserAvatar(edit_id.value!, newAvatarUrl);

  file_data.value = uploadFile.raw;

  //3. 实时更新头像在el-avatar中的显示
  //imageUrl.value = `${BASE_URL}${newAvatarUrl}?token=${localCache.getCache(LOGIN_TOKEN)}&t=${Date.now()}`;
  imageUrl.value = URL.createObjectURL(uploadFile.raw!);
}

/**
 * 点击了【确定】，发送请求，修改用户信息
 */
function handleSubmit_baseInfo() {
  if (page_type.value === T_pageType.PAGE_USER) {
    //1. 发送请求
    systemStore
      .updateUserInfoAction(edit_id.value!, formData, queryCondition.value)
      .then(() => {
        //2. 显示成功提示
        ElMessage.success('修改用户信息成功！');
      })
      .catch((error: any) => {
        ElMessage.info(error.message);
      });
  } else if (page_type.value === T_pageType.PAGE_IMAGE) {
  }

  //dialogVisible.value = false;
}

function handleSubmit_image() {
  if (page_type.value === T_pageType.PAGE_USER) {
    //1. 发送请求
    systemStore
      .updateUserAvatarAction(edit_id.value!, queryCondition.value, file_data.value!)
      .then(() => {
        //2. 显示成功提示
        ElMessage.success('修改用户头像成功！');
      })
      .catch((error: any) => {
        ElMessage.info(error.message);
      });
  } else if (page_type.value === T_pageType.PAGE_IMAGE) {
  }
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
  :deep(.el-textarea__inner) {
    height: 150px;
  }
}
.left-panel {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-right: 20px;
  border-right: 1px solid #eee;
}

.avatar-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding-left: 30px;
  padding-top: 65px;
}

.upload-btn {
  text-align: center;
}

.image-wrapper {
  margin-top: 84px;
  margin-left: 2px;
}

.right-panel {
  padding-left: 20px;
}
</style>
