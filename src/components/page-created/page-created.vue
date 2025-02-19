<template>
  <div class="user-modal">
    <el-dialog
      v-model="dialogVisible"
      :title="props.createdConfig.pageName"
      :width="props.createdConfig.dialogWidth ?? '75%'"
      center
    >
      <div class="form">
        <el-tabs v-model="activeName" class="demo-tabs">
          <!-- 第一页 -->
          <el-tab-pane label="基础信息" name="first">
            <el-form
              :model="formData"
              ref="formRef"
              :rules="accountRules"
              status-icon
              :label-width="props.createdConfig.labelWidth ?? '80px'"
            >
              <el-row>
                <el-col :span="12">
                  <template v-for="item in props.createdConfig.formItems" :key="item.prop">
                    <template
                      v-if="
                        item.order === 'first' && (item.type === 'avatar' || item.type === 'image')
                      "
                    >
                      <el-form-item :label="item.label" :prop="item.prop">
                        <!-- 头像区域 -->
                        <template v-if="item.type === 'avatar'">
                          <div class="avatar-wrapper">
                            <span class="title">用户头像</span>
                            <el-upload
                              class="avatar-uploader"
                              :action="uploadUrl"
                              :headers="{
                                Authorization: `Bearer ${localCache.getCache(LOGIN_TOKEN)}`
                              }"
                              :auto-upload="true"
                              :show-file-list="false"
                              :on-success="handleUploadSuccess"
                            >
                              <el-avatar
                                v-if="imageUrl"
                                shape="square"
                                :src="imageUrl"
                                fit="cover"
                                class="avatar"
                              />
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
                              :headers="{
                                Authorization: `Bearer ${localCache.getCache(LOGIN_TOKEN)}`
                              }"
                              :auto-upload="true"
                              :show-file-list="false"
                              :on-success="handleUploadSuccess"
                            >
                              <el-image
                                v-if="imageUrl"
                                :src="imageUrl"
                                class="avatar"
                                fit="cover"
                              />
                              <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
                            </el-upload>
                          </div>
                        </template>
                      </el-form-item>
                    </template>
                  </template>
                </el-col>

                <el-col :span="12">
                  <template v-for="item in props.createdConfig.formItems" :key="item.prop">
                    <template v-if="item.order === 'first' && item.type === 'input'">
                      <el-form-item :label="item.label" :prop="item.prop">
                        <!-- 基础输入型组件 -->
                        <template v-if="item.type === 'input'">
                          <el-input
                            v-model="formData[item.prop]"
                            :placeholder="item.placeholder"
                            :readonly="item.read_only"
                            :class="item.read_only ? 'readonly-item' : ''"
                          />
                        </template>
                      </el-form-item>
                    </template>
                  </template>
                </el-col>
              </el-row>
            </el-form>
          </el-tab-pane>

          <!-- 第二页 -->
          <el-tab-pane label="详细信息" name="second">
            <el-form
              :model="formData"
              ref="formRef"
              :rules="accountRules"
              status-icon
              :label-width="props.createdConfig.labelWidth ?? '80px'"
            >
              <el-row :gutter="24">
                <template v-for="item in props.createdConfig.formItems" :key="item.prop">
                  <template v-if="item.order === 'second'">
                    <el-col :span="10">
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
                        <template v-else-if="item.order === 'second' && item.type === 'select'">
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
                        <template v-else-if="item.order === 'second' && item.type === 'textarea'">
                          <el-input
                            v-model="formData[item.prop]"
                            type="textarea"
                            :rows="4"
                            :placeholder="item.placeholder"
                          />
                        </template>
                      </el-form-item>
                    </el-col>
                  </template>
                </template>
              </el-row>
            </el-form>
          </el-tab-pane>
        </el-tabs>
      </div>
      <template #footer>
        <el-button @click="dialogVisible = false">取消</el-button>
        <template v-if="activeName === 'first'">
          <el-button type="primary" @click="handleNextInfoPage">下一步</el-button>
        </template>
        <template v-else-if="activeName === 'second'">
          <el-button type="primary" @click="handlePrevInfoPage">上一步</el-button>
          <el-button type="success" @click="handleSubmit">确定</el-button>
        </template>
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
import { ElForm, ElMessage, type FormRules } from 'element-plus';
import { computed, reactive, ref } from 'vue';

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

const tabsName = ref(['first', 'second']);
const activeName = ref<string>(tabsName.value[0]);
const current_tab = computed(() => {
  return activeName.value === 'first' ? 0 : 1;
});

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

const validateAccount = (rule: any, value: string, callback: any) => {
  if (!value) {
    return callback(new Error('请输入账号！'));
  }

  if (!/^[a-zA-Z0-9]{6,20}$/.test(value)) {
    return callback(new Error('账号长度必须为6-20位字母或数字！'));
  }

  systemStore
    .checkUserAccountAction(value)
    .then(() => {
      callback();
    })
    .catch((error: any) => {
      callback(new Error(error.message));
    });
};

const validatePassword = (rule: any, value: string, callback: any) => {
  formData.password = '123456'; //默认密码
  callback();
};

//校验规则
const accountRules: FormRules = {
  user_account: [{ required: true, validator: validateAccount, trigger: 'blur' }],
  user_name: [{ message: '请输入用户名', trigger: 'blur' }],
  password: [
    { message: '请输入密码', trigger: 'blur' },
    { validator: validatePassword, trigger: 'blur' }
  ],
  mobile: [
    { required: true, message: '请输入手机号码', trigger: 'blur' }
    //{ pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号码', trigger: 'blur' }
  ],
  email: [
    { required: true, message: '请输入邮箱', trigger: 'blur' },
    { type: 'email', message: '请输入正确的邮箱', trigger: 'blur' }
  ]
};

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

function handleNextInfoPage() {
  if (current_tab.value < tabsName.value.length - 1) {
    activeName.value = tabsName.value[current_tab.value + 1];
  }
}

function handlePrevInfoPage() {
  if (current_tab.value > 0) {
    activeName.value = tabsName.value[current_tab.value - 1];
  }
}

/**
 * 点击了【新建】，发送请求，新建一个用户
 */
function handleSubmit() {
  let action: Promise<any>;
  let successMessage: string;

  if (page === T_pageType.PAGE_USER) {
    action = systemStore.createNewUserAction(formData, file_data.value!);
    successMessage = '新建用户成功！';
  } else if (page === T_pageType.PAGE_IMAGE) {
    action = systemStore.createNewImageAction(formData, file_data.value!);
    successMessage = '新建图片成功！';
  } else {
    ElMessage.error('未知页面类型');
    return;
  }

  action
    .then(() => {
      ElMessage.success(successMessage);
      dialogVisible.value = false;
      formRef.value?.resetFields();
    })
    .catch((error: any) => {
      ElMessage.error(error.message); // 通过消息弹窗显示错误信息
    });
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

  .avatar-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    padding-top: 0px;
    margin-top: 0px;
    .title {
      font-size: 20px;
      color: var(--el-text-color-secondary);
    }
    .avatar-uploader .avatar {
      width: 100%;
      height: 80%;
      display: block;
    }
    .el-icon.avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 178px;
      height: 178px;
      text-align: center;
    }
  }
}

.left-panel {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-right: 20px;
  border-right: 1px solid #eee;
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
