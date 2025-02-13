<template>
  <div class="main-header">
    <div class="menu-icon" @click="onMenuIconClick">
      <el-icon size="25">
        <component :is="isFold ? 'Expand' : 'Fold'" />
      </el-icon>
    </div>
    <div class="content">
      <header-crumb></header-crumb>
      <header-info></header-info>
    </div>
  </div>
</template>

<script setup lang="ts" name="main-header">
import { ref } from 'vue';
import headerInfo from './c-cpns/header-info.vue';
import headerCrumb from './c-cpns/header-crumb.vue';
const isFold = ref(false);
//内部自定义事件
const emit = defineEmits(['foldChange']);
function onMenuIconClick() {
  //1. 内部改变状态
  isFold.value = !isFold.value;

  //2. 外部通知
  emit('foldChange', isFold.value);
}
</script>

<style scoped lang="less">
.main-header {
  display: flex;
  align-items: center;
  flex: 1;
  height: 100%;

  .menu-icon {
    display: flex;
    align-items: center;
    cursor: pointer;
  }

  .content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex: 1;
    padding: 0 18px;
  }
}
</style>
