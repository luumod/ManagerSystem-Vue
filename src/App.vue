<template>
  <div class="App">
    <el-config-provider :locale="zhCn">
      <router-view></router-view>
    </el-config-provider>
  </div>
</template>

<script setup lang="ts" name="App">
import { zhCn } from 'element-plus/es/locales.mjs';

</script>

<style scoped>
.App {
  background-color: rgb(255, 255, 255);
  height: 100vh;
  width: 100vw;
}
</style>
