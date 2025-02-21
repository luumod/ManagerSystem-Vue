<template>
  <div class="show-avatar">
    <div style="text-align: center">{{ props.title }}</div>

    <input v-show="false" ref="nativeInputRef" type="file" @change="handleFileChange" />

    <!-- 上传态与图片态分离 -->
    <div v-if="!imageUrl" style="width: 80%; height: 75%; margin: 5px auto">
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
        <el-icon class="avatar-uploader-icon"><Plus /></el-icon>
      </el-upload>
    </div>
    <div v-else>
      <el-image ref="imageRef" :src="imageUrl" :preview-src-list="[imageUrl]" fit="cover" />
      <div style="text-align: center">
        <el-button @click="handleReloadImage">重新上传</el-button>
        <el-button @click="handleViewOriginal">查看原图</el-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts" name="show-avatar">
import { LOGIN_TOKEN } from '@/global/constants';
import { localCache } from '@/utils/cache';
import { ElMessage, ElUpload, type ImageInstance } from 'element-plus';
import { ref } from 'vue';

const imageUrl = ref('');
const file_data = ref<File>();

interface IProps {
  uploadUrl: string;
  title: string;
}

const props = defineProps<IProps>();
const nativeInputRef = ref(); //模拟原生input元素的点击事件
const imageRef = ref<ImageInstance>();

//通知父组件图片的变化
const emits = defineEmits(['handleUploadSuccess']);

/**
 * 点击重新上传图片
 */
function handleReloadImage() {
  nativeInputRef.value?.click();
}

/**
 * 点击显示预览图片
 */
function handleViewOriginal() {
  imageRef.value?.showPreview();
}

/**
 * 处理type="file"的原生input元素的上传
 * @param event 原生事件对象
 */
const handleFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const file = target.files ? target.files[0] : null;
  if (file) {
    file_data.value = file;
    imageUrl.value = URL.createObjectURL(file);
    emits('handleUploadSuccess', file_data.value);
    ElMessage.success('切换图片');
  }
};

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
