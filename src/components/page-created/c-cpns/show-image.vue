<template>
  <div class="show-avatar">
    <div style="text-align: center">{{ props.title }}</div>
    <div style="width: 80%; height: 75%; margin: 5px auto">
      <el-upload
        class="avatar-uploader"
        :action="props.uploadUrl"
        :headers="{
          Authorization: `Bearer${localCache.getCache(LOGIN_TOKEN)}`
        }"
        :auto-upload="true"
        :show-file-list="false"
        :on-success="handleUploadSuccess"
      >
        <el-image
          ref="imageRef"
          v-if="imageUrl"
          :src="imageUrl"
          :preview-src-list="[imageUrl]"
          fit="cover"
        />
        <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
      </el-upload>
    </div>
    <div v-if="file_data" style="text-align: center">
      <el-button @click="handleViewOriginal">查看原图</el-button>
    </div>
  </div>
</template>

<script setup lang="ts" name="show-avatar">
import { LOGIN_TOKEN } from '@/global/constants';
import { localCache } from '@/utils/cache';
import type { ImageInstance } from 'element-plus';
import { ref } from 'vue';

const imageUrl = ref('');
const file_data = ref<File>();

interface IProps {
  uploadUrl: string;
  title: string;
}

const props = defineProps<IProps>();
const emits = defineEmits(['handleUploadSuccess']);

const imageRef = ref<ImageInstance>();

function handleViewOriginal() {
  imageRef.value?.showPreview();
}

/**
 * 处理上传头像/图片成功
 * @param response 服务器返回的响应
 * @param uploadFile 上传的文件对象
 */
function handleUploadSuccess(response: any, uploadFile: any) {
  if (response.code === 0) {
    //1. 让图片显示出来
    imageUrl.value = URL.createObjectURL(uploadFile.raw!);

    //2. 保存图片数据
    file_data.value = uploadFile.raw!;
    emits('handleUploadSuccess', file_data.value);
  }
}
</script>

<style scoped lang="less">
.show-avatar {
  position: relative;
  overflow: hidden;
  cursor: pointer;
  width: 320px;
  min-width: 320px;
  height: 320px;
  min-height: 320px;
  margin: 0 auto;

  //头像框
  .avatar-uploader {
    height: 100%;
    width: 100%;
    border: 1px dashed var(--el-border-color);
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: var(--el-transition-duration-fast);

    //头像适应宽度与高度
    .el-image {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
  }

  //鼠标放到头像框内
  .avatar-uploader:hover {
    border: 1px dashed var(--el-color-primary);
  }

  // + 号图标
  .el-icon.avatar-uploader-icon {
    font-size: 28px;
    color: #a78fd5;
    text-align: center;
    position: absolute;
    width: 100%;
    height: 100%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>
