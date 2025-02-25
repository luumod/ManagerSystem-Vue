<template>
  <div class="sider-bar">
    <!-- 打开图片 -->
    <div class="flex flex-col items-center justify-center">
      <el-upload
        class="upload-btn"
        :action="uploadUrl"
        :headers="{ Authorization: `Bearer ${localCache.getCache(LOGIN_TOKEN)}` }"
        :auto-upload="true"
        :show-file-list="false"
        :on-success="handleUploadSuccess"
      >
        <el-button type="primary">Click to upload</el-button>
      </el-upload>
    </div>

    <!-- 不同的参数控制区域 -->
    <component :is="activeOperationComponent" class="operation-container" v-bind="dynamicProps" />

    <!--- 缩放图片区域 -->
    <div
      class="flex items-center justify-center border-t-2"
      style="border-color: rgb(195, 195, 195); padding-top: 20px"
    >
      <button class="mat-icon-button">
        <el-icon><Minus /></el-icon>
      </button>
      <div class="current">
        <div trans="">缩放</div>
        <div class="value">62%</div>
      </div>
      <button mat-icon-button="" class="mat-icon-button">
        <el-icon><Plus /></el-icon>
      </button>
    </div>

    <!-- 撤销与回退区域 -->
    <div
      class="flex items-center justify-center border-t-2"
      style="border-color: rgb(195, 195, 195); padding-top: 20px"
    >
      <el-button icon="RefreshLeft" size="large"></el-button>
      <el-button icon="RefreshRight" size="large"></el-button>
    </div>

    <!-- 保存图片区域 -->
    <div
      class="flex items-center justify-center border-t-2"
      style="border-color: rgb(195, 195, 195); padding-top: 20px"
    >
      <el-button type="primary" @click="emitter">保存图片</el-button>
    </div>
  </div>
</template>

<script setup lang="ts" name="sider-bar">
import { LOGIN_TOKEN } from '@/global/constants';
import { BASE_URL } from '@/service/config';
import { localCache } from '@/utils/cache';
import { computed, ref, type DefineComponent } from 'vue';
import ChangeSize from './operations/change-size.vue';
import type { I_OpeartionProps } from '@/store/process/types';
import emitter from '@/utils/emitter';

const uploadUrl = ref(`${BASE_URL}/fake_upload`);
const file_data = ref<File>();
const emit = defineEmits(['uploadSuccess']);
function handleUploadSuccess(response: any, uploadFile: any) {
  file_data.value = uploadFile.raw;
  emit('uploadSuccess', file_data.value);
}

const change_size_config = ref<I_OpeartionProps>();
emitter.on('setCanvas', (config: any) => {
  change_size_config.value = config;
});
// 修改 dynamicProps 的计算逻辑
const dynamicProps = computed(() => {
  switch (activeOperation.value) {
    case 'change-size':
      return {
        key: `${change_size_config.value?.width}-${change_size_config.value?.height}`, // 关键：强制刷新组件
        width: change_size_config.value?.width,
        height: change_size_config.value?.height
      };
    default:
      return { key: Date.now() };
  }
});

type OperationKey = 'change-size';

const componentMap: { [key in OperationKey]: DefineComponent<I_OpeartionProps, any, any> } = {
  'change-size': ChangeSize
};

const activeOperation = ref<OperationKey | null>(null);
emitter.on('open-changeSize', () => {
  activeOperation.value = 'change-size';
});
emitter.on('close-current-drawer', () => {
  activeOperation.value = null;
});

// 动态计算组件
const activeOperationComponent = computed(() => {
  if (activeOperation.value) {
    return componentMap[activeOperation.value];
  }
  return null;
});
</script>

<style scoped lang="less">
.sider-bar {
  display: flex;
  flex-direction: column;
  gap: 50px;
  border-left: 1px solid rgb(237, 237, 237);
  width: 95%;
  height: 100vh;
  margin: 20px 10px 20px 0px;

  .slider-demo-block {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-left: 10px;

    .demonstration {
      font-size: 14px;
      color: var(--el-text-color-secondary);
      line-height: 44px;
      flex: 1;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      margin-bottom: 0;
    }
  }

  .mat-icon-button {
    margin: 0 auto;
    padding: 0;
    min-width: 0;
    width: 40px;
    height: 40px;
    flex-shrink: 0;
    line-height: 40px;
    border-radius: 50%;
    cursor: pointer;
  }
}
</style>
