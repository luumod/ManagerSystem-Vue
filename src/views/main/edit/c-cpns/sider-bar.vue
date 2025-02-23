<template>
  <div class="sider-bar">
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
</template>

<script setup lang="ts" name="sider-bar">
import { LOGIN_TOKEN } from '@/global/constants';
import { BASE_URL } from '@/service/config';
import { localCache } from '@/utils/cache';
import { ref } from 'vue';

const uploadUrl = ref(`${BASE_URL}/fake_upload`);
const file_data = ref<File>();
const emit = defineEmits(['uploadSuccess']);
function handleUploadSuccess(response: any, uploadFile: any) {
  file_data.value = uploadFile.raw;
  emit('uploadSuccess', file_data.value);
}
</script>

<style scoped>
.sider-bar {
  border: 1px solid #dd0c0c;
  width: 95%;
  height: 100vh;
  margin-bottom: 20px;
}
</style>
