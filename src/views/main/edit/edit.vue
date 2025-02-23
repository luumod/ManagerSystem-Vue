<template>
  <div class="edit">
    <el-container>
      <el-container>
        <el-header>
          <navigation-bar
            v-show="navi_curr_idx === 0"
            @click-navigation-button="handleNaviClick"
          ></navigation-bar>
          <drawer-wrapper
            v-show="navi_curr_idx !== 0"
            @click-close-current-drawer="handleCloseDrawer"
          ></drawer-wrapper>
        </el-header>
        <el-main>
          <main-content ref="mainContentRef"></main-content>
        </el-main>
      </el-container>
      <el-aside width="300px">
        <sider-bar @upload-success="handleUploadSuccess"></sider-bar>
      </el-aside>
    </el-container>
  </div>
</template>

<script setup lang="ts" name="edit">
import cv from 'opencv-ts';
import { ref } from 'vue';
import NavigationBar from './c-cpns/navigation-bar.vue';
import MainContent from './c-cpns/main-content.vue';
import SiderBar from './c-cpns/sider-bar.vue';
import DrawerWrapper from './c-cpns/drawer-wrapper.vue';

const mainContentRef = ref<InstanceType<typeof MainContent> | null>(null);
const imageRef = ref<HTMLImageElement | null>(null);
const canvasRef = ref<HTMLCanvasElement | null>(null);
const navi_curr_idx = ref(0);

function handleNaviClick(idx: number) {
  navi_curr_idx.value = idx;
  console.log('进入下一层：navi_curr_idx', navi_curr_idx.value);
}

function handleCloseDrawer() {
  navi_curr_idx.value = 0;
  console.log('回来了：navi_curr_idx', navi_curr_idx.value);
}

function handleUploadSuccess(file: File) {
  mainContentRef.value?.setCanvas(file);
}

function handleFileChange(event: any) {
  const file = event.target as HTMLInputElement;
  if (file.files?.[0]) {
    const url = URL.createObjectURL(file.files[0]);
    if (imageRef.value) {
      imageRef.value.src = url;
    }
  }
}

function showImageInCanvas() {
  if (imageRef.value && canvasRef.value) {
    const mat = cv.imread(imageRef.value);
    if (mat.empty()) {
      return;
    }
    cv.imshow(canvasRef.value, mat);
    mat.delete();
  }
}
</script>

<style scoped lang="less">
.edit {
  width: 100%;
  height: 100vh;
}
</style>
