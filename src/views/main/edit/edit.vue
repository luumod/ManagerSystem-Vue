<template>
  <div class="edit">
    <el-container>
      <el-container>
        <el-header>
          <navigation-bar
            v-show="navi_curr_idx === 0"
            ref="navigationRef"
            @click-navigation-button="handleNaviClick"
          ></navigation-bar>
          <drawer-wrapper
            v-show="navi_curr_idx !== 0"
            @click-close-current-drawer="handleCloseDrawer"
          ></drawer-wrapper>
        </el-header>
        <el-main>
          <main-canvas ref="mainCanvasRef"></main-canvas>
        </el-main>
      </el-container>
      <el-aside width="300px">
        <sider-bar @upload-success="handleUploadSuccess"></sider-bar>
      </el-aside>
    </el-container>
  </div>
</template>

<script setup lang="ts" name="edit">
import { ref } from 'vue';
import NavigationBar from './c-cpns/navigation-bar.vue';
import MainCanvas from './c-cpns/main-canvas.vue';
import SiderBar from './c-cpns/sider-bar.vue';
import DrawerWrapper from './c-cpns/drawer-wrapper.vue';

const mainCanvasRef = ref<InstanceType<typeof MainCanvas> | null>(null);
const navi_curr_idx = ref(0);
const is_upload = ref(false);
const navigationRef = ref<InstanceType<typeof NavigationBar> | null>(null);

function handleNaviClick(idx: number) {
  navi_curr_idx.value = idx;
  console.log('进入下一层：navi_curr_idx', navi_curr_idx.value);
}

function handleCloseDrawer() {
  navi_curr_idx.value = 0;
  console.log('回来了：navi_curr_idx', navi_curr_idx.value);
}

function handleUploadSuccess(file: File) {
  is_upload.value = true;
  navigationRef.value!.isCanClick = true;
  mainCanvasRef.value?.setCanvas(file);
}
</script>

<style scoped lang="less">
.edit {
  width: 100%;
  height: 100vh;
}
</style>
