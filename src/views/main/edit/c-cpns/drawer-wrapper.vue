<template>
  <div class="navigation-bar">
    <el-button type="default" @click="handleCloseCurrentDrawer">关闭</el-button>
    <e-button
      :config="{ id: 11, icon: 'edit', desc: '调整尺寸', rounded: true, compact: true }"
      @click="emitter.emit('open-changeSize')"
    >
    </e-button>
    <div class="separator" style=""></div>
    <e-button
      :config="{ id: 12, icon: 'download', desc: '图像裁剪', rounded: true, compact: true }"
    ></e-button>
    <e-button
      :config="{ id: 13, icon: 'upload', desc: ' 图像旋转/翻转', rounded: true, compact: true }"
    ></e-button>
    <e-button
      :config="{ id: 14, icon: 'Female', desc: '透视变换', rounded: true, compact: true }"
    ></e-button>
    <e-button
      :config="{ id: 15, icon: 'Female', desc: '图像拼接', rounded: true, compact: true }"
    ></e-button>
  </div>
</template>

<script setup lang="ts" name="navigation-bar">
import emitter from '@/utils/emitter';
import eButton from './e-button.vue';

const emit = defineEmits(['clickCloseCurrentDrawer']);

function handleCloseCurrentDrawer() {
  emit('clickCloseCurrentDrawer');
  emitter.emit('close-current-drawer');
}
</script>

<style scoped lang="less">
.navigation-bar {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;

  .separator {
    height: 75px;
    width: 1px;
    flex: 0 0 1px;
    background-color: rgba(0, 0, 0, 0.07);
    margin: 0 20px;
  }
}
</style>
