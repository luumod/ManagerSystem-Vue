<template>
  <div class="user-modal">
    <el-dialog
      v-model="dialogVisible"
      :title="props.createdConfig.pageName"
      :width="props.createdConfig.dialogWidth ?? '75%'"
      center
    >
      <div class="form">
        <el-form
          :model="formData"
          ref="formRef"
          status-icon
          :label-width="props.createdConfig.labelWidth ?? '80px'"
        >
          <el-row>
            <!-- 左侧图片区域 -->
            <el-col :span="8">
              <div class="left-panel">
                <template v-for="item in props.createdConfig.formItems" :key="item.prop">
                  <!-- 头像区域 -->
                  <template v-if="item.type === 'avatar'">
                    <div class="avatar-wrapper" style="margin-bottom: 20px">
                      <el-upload
                        class="avatar-uploader"
                        :action="uploadUrl"
                        :headers="{ Authorization: `Bearer ${localCache.getCache(LOGIN_TOKEN)}` }"
                        :auto-upload="true"
                        :show-file-list="true"
                        :on-success="handleUploadSuccess"
                      >
                        <img v-if="imageUrl" :src="imageUrl" class="avatar" />
                        <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
                      </el-upload>
                    </div>
                  </template>

                  <!-- 图片区域 -->
                  <template v-if="item.type === 'image'">
                    <div class="image-wrapper">
                      <el-upload
                        class="avatar-uploader"
                        :action="uploadUrl"
                        :headers="{ Authorization: `Bearer ${localCache.getCache(LOGIN_TOKEN)}` }"
                        :auto-upload="true"
                        :show-file-list="true"
                        :on-success="handleUploadSuccess"
                      >
                        <img v-if="imageUrl" :src="imageUrl" class="avatar" />
                        <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
                      </el-upload>
                    </div>
                  </template>
                </template>
              </div>
            </el-col>

            <!-- 右侧表单区域 -->
            <el-col :span="16">
              <div class="right-panel">
                <template v-for="item in props.createdConfig.formItems" :key="item.prop">
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
        <el-button type="primary" @click="handleSubmit">确定</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts" name="user-modal">
import { LOGIN_TOKEN } from '@/global/constants';
import { BASE_URL } from '@/service/config';
import useSystemStore from '@/store/main/system/system';
import { T_pageType } from '@/store/main/system/types';
import { localCache } from '@/utils/cache';
import { ElForm, ElMessage } from 'element-plus';
import { reactive, ref } from 'vue';

interface IProps {
  createdConfig: {
    pageType: T_pageType;
    dialogWidth?: string;
    pageName: string;
    labelWidth?: number;
    formItems: any[];
  };
}

const props = defineProps<IProps>();

const initialForm: any = {};
for (const item of props.createdConfig.formItems) {
  initialForm[item.prop] = item.initialValue ?? '';
}
const formData = reactive(initialForm);
const page = props.createdConfig.pageType;

const file_data = ref<File>();
const imageUrl = ref('');
const uploadUrl = ref('');

const dialogVisible = ref(false);
const systemStore = useSystemStore();

// const validateAccount = (rule: any, value: string, callback: any) => {
//   if (!value) {
//     return callback(new Error('请输入账号！'));
//   }

//   if (!/^[a-zA-Z0-9]{6,20}$/.test(value)) {
//     return callback(new Error('账号长度必须为6-20位字母或数字！'));
//   }

//   systemStore
//     .checkUserAccountAction(value)
//     .then(() => {
//       callback();
//     })
//     .catch((error: any) => {
//       callback(new Error(error.message));
//     });
// };

// //校验规则
// const accountRules: FormRules = {
//   user_account: [{ validator: validateAccount, trigger: 'blur' }],
//   user_name: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
//   password: [
//     { required: true, message: '请输入密码', trigger: 'blur' },
//     { pattern: /^[a-zA-Z0-9]{6,20}$/, message: '密码长度必须在6-20位之间', trigger: 'blur' }
//   ],
//   mobile: [
//     { required: true, message: '请输入手机号码', trigger: 'blur' },
//     { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号码', trigger: 'blur' }
//   ],
//   email: [
//     { required: true, message: '请输入邮箱', trigger: 'blur' },
//     { type: 'email', message: '请输入正确的邮箱', trigger: 'blur' }
//   ]
// };

const formRef = ref<InstanceType<typeof ElForm>>();

function showCreatedNewUserDlg() {
  dialogVisible.value = true;

  uploadUrl.value = BASE_URL + `/fake_upload`; //占位
}

function handleUploadSuccess(response: any, uploadFile: any) {
  //主要是获取uploadFile
  if (response.code === 0) {
    //raw就是File对象
    imageUrl.value = URL.createObjectURL(uploadFile.raw!);
    file_data.value = uploadFile.raw!;
    //name: 文件名，在上传图片中用到，上传头像无需用到
  }
}

/**
 * 点击了【新建】，发送请求，新建一个用户
 */
function handleSubmit() {
  if (page === T_pageType.PAGE_USER) {
    //1. 发送请求
    systemStore
      .createNewUserAction(formData, file_data.value!)
      .then(() => {
        //2. 显示成功提示
        ElMessage.success('新建用户成功！');

        //3. 关闭弹窗
        dialogVisible.value = false;

        //4. 刷新列表
        formRef.value?.resetFields();
      })
      .catch((error: any) => {
        //1. 显示失败提示
        ElMessage.error(error.message);
      });
  } else if (page === T_pageType.PAGE_IMAGE) {
    //1. 发送请求
    systemStore
      .createNewImageAction(formData, file_data.value!)
      .then(() => {
        //2. 显示成功提示
        ElMessage.success('新建图片成功！');

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
}

defineExpose({ showCreatedNewUserDlg });
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

.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
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
