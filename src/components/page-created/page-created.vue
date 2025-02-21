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
            <template #label>
              <span class="custom-tabs-label">
                <span v-show="show_dot_1" class="dot1"></span>
                <el-icon><User /></el-icon>
                <span>基础信息</span>
              </span>
            </template>
            <el-form
              :model="formData"
              ref="formRef_first"
              :rules="accountRules"
              :label-width="props.createdConfig.labelWidth ?? '80px'"
              status-icon
            >
              <el-row>
                <el-col :span="8">
                  <template v-for="item in props.createdConfig.formItems" :key="item.prop">
                    <template
                      v-if="
                        item.order === 'first' && (item.type === 'avatar' || item.type === 'image')
                      "
                    >
                      <el-form-item :label="item.label" :prop="item.prop">
                        <!-- 头像区域 -->
                        <template v-if="item.type === 'avatar' || item.type === 'image'">
                          <show-image
                            :uploadUrl="uploadUrl"
                            :title="props.createdConfig.imageAreaTitle"
                            @handleUploadSuccess="receiveFileData"
                          ></show-image>
                        </template>
                      </el-form-item>
                    </template>
                  </template>
                </el-col>

                <el-col
                  :span="16"
                  style="
                    display: flex;
                    flex-direction: column;
                    flex-wrap: wrap;
                    align-content: center;
                  "
                >
                  <template v-for="item in props.createdConfig.formItems" :key="item.prop">
                    <template v-if="item.order === 'first'">
                      <el-form-item :label="item.label" :prop="item.prop">
                        <!-- 基础输入型组件 -->
                        <template v-if="item.type === 'input'">
                          <div
                            style="
                              display: flex;
                              justify-content: space-between;
                              align-items: center;
                            "
                          >
                            <el-input
                              v-model="formData[item.prop]"
                              :placeholder="item.placeholder"
                              :readonly="item.read_only"
                              :class="item.read_only ? 'readonly-item' : ''"
                              style="width: 200px"
                              clearable
                            />
                          </div>
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
            <template #label>
              <span class="custom-tabs-label">
                <span v-show="show_dot_2" class="dot2"></span>
                <el-icon><Edit /></el-icon>
                <span>详细信息</span>
              </span>
            </template>
            <el-form
              :model="formData"
              ref="formRef_second"
              :rules="accountRules"
              status-icon
              :label-width="props.createdConfig.labelWidth ?? '80px'"
            >
              <template v-for="item in props.createdConfig.formItems" :key="item.prop">
                <template
                  v-if="item.order === 'second' && item.type != 'avatar' && item.type != 'image'"
                >
                  <el-form-item
                    :label="item.label"
                    :prop="item.prop"
                    style="width: 60%; margin-bottom: 30px"
                  >
                    <!-- 少选型组件 -->
                    <template v-if="item.type === 'radio'">
                      <el-radio-group v-model="formData[item.prop]">
                        <template v-for="option in item.options" :key="option.value">
                          <el-radio :value="option.value">{{ option.label }}</el-radio>
                        </template>
                      </el-radio-group>
                    </template>

                    <!-- 输入型组件 -->
                    <template v-if="item.type === 'input'">
                      <el-input
                        v-model="formData[item.prop]"
                        :placeholder="item.placeholder"
                        :readonly="item.read_only"
                        :class="item.read_only ? 'readonly-item' : ''"
                      />
                    </template>

                    <!-- 多选型组件 -->
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

                    <!-- 日期型组件 -->
                    <template v-else-if="item.type === 'picker'">
                      <el-date-picker
                        v-model="formData[item.prop]"
                        type="datetime"
                        :disabled="true"
                        :placeholder="item.placeholder"
                      />
                    </template>

                    <!-- 文本域 -->
                    <template v-else-if="item.type === 'textarea'">
                      <el-input
                        v-model="formData[item.prop]"
                        type="textarea"
                        :placeholder="item.placeholder"
                        autosize
                        maxlength="300"
                        show-word-limit
                      />
                    </template>
                  </el-form-item>
                </template>
              </template>
            </el-form>
          </el-tab-pane>
        </el-tabs>
      </div>
      <template #footer>
        <div class="footer">
          <div></div>
          <div>
            <el-button @click="dialogVisible = false">取消</el-button>
            <template v-if="activeName === 'first'">
              <el-button type="primary" @click="handleNextInfoPage(formRef_first)"
                >下一步</el-button
              >
            </template>
            <template v-else-if="activeName === 'second'">
              <el-button type="primary" @click="handlePrevInfoPage">上一步</el-button>
              <el-button type="success" @click="handleSubmit(formRef_first, formRef_second)"
                >确定</el-button
              >
            </template>
          </div>

          <el-button color="#626aef" @click="handleGenerateRandomAll">随机生成</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts" name="user-modal">
import { BASE_URL } from '@/service/config';
import useSystemStore from '@/store/main/system/system';
import { T_pageType } from '@/store/main/system/types';
import { ElForm, ElMessage, type FormInstance, type FormRules } from 'element-plus';
import { computed, onMounted, reactive, ref } from 'vue';
import {
  generateRandomAccount,
  generateRandomEmail,
  generateRandomMobile,
  generateRandomUsername
} from '@/global/random-gen';
import ShowImage from './c-cpns/show-image.vue';

interface IProps {
  createdConfig: {
    imageAreaTitle: string;
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

//const imageUrl = ref('');
const uploadUrl = ref('');

const show_dot_1 = ref(false);
const show_dot_2 = ref(false);
const tabsName = ref(['first', 'second']);
const activeName = ref<string>(tabsName.value[0]);
const current_tab = computed(() => {
  return activeName.value === 'first' ? 0 : 1;
});

const dialogVisible = ref(false);
const systemStore = useSystemStore();

const formRef_first = ref<FormInstance>();
const formRef_second = ref<FormInstance>();

const file_data = ref<File>();
//校验账号
const validateAccount = (rule: any, value: string, callback: any) => {
  if (!value) {
    return callback(new Error('请输入账号！'));
  }

  if (!/^[a-zA-Z0-9]{6,20}$/.test(value)) {
    return callback(new Error('账号长度必须为6-20位字母或数字！'));
  }

  //检查账号的唯一性
  systemStore
    .checkUserAccountAction(value)
    .then(() => {
      callback();
    })
    .catch((error: any) => {
      callback(new Error(error.message));
    });
};

//校验用户ID
const validateId = (rule: any, input_value: string, callback: any) => {
  if (!input_value) {
    return callback(new Error('请输入图片所有者ID！'));
  }

  //检查账号的唯一性
  //如果input_value存在于ids中，说明输入的ID是正确的
  if (ids.value.some((item) => item.value === input_value)) {
    callback();
  } else {
    return callback(new Error('请输入正确的图片所有者ID！'));
  }
};

//检查密码
const validatePassword = (rule: any, value: string, callback: any) => {
  formData.password = '123456'; //默认密码
  callback();
};

//校验规则
const accountRules: FormRules = {
  //新建用户
  user_account: [{ required: true, validator: validateAccount, trigger: 'blur' }],
  user_name: [{ message: '请输入用户名', trigger: 'blur' }],
  password: [
    { message: '请输入密码', trigger: 'blur' },
    { validator: validatePassword, trigger: 'blur' }
  ],
  mobile: [
    { required: true, message: '请输入手机号码', trigger: 'blur' },
    { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号码', trigger: 'blur' }
  ],
  email: [
    { required: true, message: '请输入邮箱', trigger: 'blur' },
    { type: 'email', message: '请输入正确的邮箱', trigger: 'blur' }
  ],
  gender: [{ required: true, message: '请选择性别', trigger: 'change' }],

  //新建图片
  owner_id: [{ required: true, validator: validateId, trigger: 'change' }]
};

interface IIds {
  value: string;
}

const ids = ref<IIds[]>([]);
/**
 * 点击了【新建】，弹出新建数据行的弹窗
 */
async function showCreatedNewUserDlg() {
  dialogVisible.value = true;
  activeName.value = tabsName.value[0];
  uploadUrl.value = BASE_URL + `/fake_upload`; //占位
}

onMounted(async () => {
  try {
    const ids_data = await systemStore.queryUserIdList();
    // 确保接口返回的是数组格式，否则强制转换或使用默认值
    for (const item of ids_data) {
      ids.value.push({ value: item });
    }
  } catch (error) {
    console.error('Failed to fetch user IDs:', error);
    ids.value = []; // 出错时保持数组类型
  }
});

/**
 * 随机生成符合格式的数据
 */
function handleGenerateRandomAll() {
  //随机生成formData的所有数据
  for (const item of props.createdConfig.formItems) {
    switch (item.prop) {
      case 'user_account':
        formData[item.prop] = generateRandomAccount();
        break;

      case 'user_name':
        formData[item.prop] = generateRandomUsername();
        break;

      case 'mobile':
        formData[item.prop] = generateRandomMobile();
        break;

      case 'email':
        formData[item.prop] = generateRandomEmail();
        break;

      default:
        break;
    }
  }
}

// let timeout: ReturnType<typeof setTimeout>;
// const querySearchAsync = (queryString: string, cb: (arg: any) => void) => {
//   const results = queryString ? ids.value.filter(createFilter(queryString)) : ids.value;
//   clearTimeout(timeout);
//   timeout = setTimeout(() => {
//     cb(results);
//   }, 3000 * Math.random());
// };
// const createFilter = (queryString: string) => {
//   return (userId: IIds) => {
//     return userId.value.indexOf(queryString) === 0;
//   };
// };

/**
 * 检查每一子页的输入信息的合法性，并且会弹出一个红色点点来提示用户某一页输入信息有误
 * @param formEl （某一页的）表单实例
 */
async function checkFormValid(formEl: FormInstance | undefined) {
  if (!formEl) {
    throw new Error('页面错误！');
  }

  try {
    await formEl.validate((valid) => {
      if (!valid) {
        throw new Error('请输入正确的信息！');
      }
    });
  } catch (error: any) {
    if (formEl === formRef_first.value) show_dot_1.value = true;
    else if (formEl === formRef_second.value) show_dot_2.value = true;
    throw error;
  }
}

/**
 * 处理进入下一页前的校验
 * @param formEl_first 上一页的表单实例
 */
async function handleNextInfoPage(formEl_first: FormInstance | undefined) {
  try {
    await checkFormValid(formEl_first);
    if (current_tab.value < tabsName.value.length - 1) {
      activeName.value = tabsName.value[current_tab.value + 1];
      show_dot_1.value = false;
    }
  } catch (error: any) {
    ElMessage.error(error.message);
  }
}

/**
 * 处理进入上一页前的校验
 */
function handlePrevInfoPage() {
  if (current_tab.value > 0) {
    activeName.value = tabsName.value[current_tab.value - 1];
    show_dot_2.value = false;
  }
}

function receiveFileData(file: File) {
  file_data.value = file;
}

/**
 * 点击提交，校验输入信息，然后发创建请求
 * @param formEl_first 上一页的表单实例
 * @param formEl_second 下一页的表单实例
 */
async function handleSubmit(
  formEl_first: FormInstance | undefined,
  formEl_second: FormInstance | undefined
) {
  try {
    await checkFormValid(formEl_first);
    await checkFormValid(formEl_second);
  } catch (error: any) {
    ElMessage.error(error.message);
    return;
  }

  let action: Promise<any>;
  let successMessage: string;
  if (!file_data.value) {
    ElMessage.info('未选择头像！');
  }

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
      formEl_first!.resetFields();
      formEl_second!.resetFields();
    })
    .catch((error: any) => {
      ElMessage.error(error.message); // 通过消息弹窗显示错误信息
    });
}

defineExpose({ showCreatedNewUserDlg });
</script>

<style scoped lang="less">
.form {
  height: 400px;
  margin-top: 10px;

  .readonly-item {
    :deep(.el-input__wrapper.is-focus) {
      box-shadow: 0 0 0 1px rgb(255, 33, 33) inset;
    }
  }

  .custom-tabs-label span {
    margin-left: 6px;
  }

  .el-col-16 {
    .el-form-item {
      margin-bottom: 30px;
    }
  }
}

.footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.dot1 {
  position: absolute;
  top: 6px;
  right: 11px;
  z-index: 10;
  width: 6px;
  height: 6px;
  background: red;
  border-radius: 100%;
}
.dot2 {
  position: absolute;
  top: 5px;
  right: -7px;
  z-index: 10;
  width: 6px;
  height: 6px;
  background: red;
  border-radius: 100%;
}
</style>
