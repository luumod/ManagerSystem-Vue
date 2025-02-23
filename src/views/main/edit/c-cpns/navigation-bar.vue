<template>
  <div class="navigation-bar">
    <e-button
      :config="{ id: 1, icon: 'edit', desc: '几何变换', rounded: true, compact: true }"
      @clickButton="handleClickButton"
    >
    </e-button>
    <div class="separator" style=""></div>
    <e-button
      :config="{ id: 2, icon: 'download', desc: '颜色调整', rounded: true, compact: true }"
      @clickButton="handleClickButton"
    ></e-button>
    <e-button
      :config="{ id: 3, icon: 'upload', desc: '滤波与增强', rounded: true, compact: true }"
      @clickButton="handleClickButton"
    ></e-button>
    <e-button
      :config="{ id: 4, icon: 'Female', desc: '形态学操作', rounded: true, compact: true }"
      @clickButton="handleClickButton"
    ></e-button>
  </div>
</template>

<script setup lang="ts" name="navigation-bar">
import eButton from './e-button.vue';

const emit = defineEmits(['clickNavigationButton']);

function handleClickButton(id: number) {
  console.log(`click button ${id}`);
  emit('clickNavigationButton', id);
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
