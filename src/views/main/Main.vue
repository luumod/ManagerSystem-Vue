<template>
  <div class="main">
    <!-- <button @click="exitLogin">退出登录</button> -->
    <el-container class="main-content">
      <el-aside :width="isFold ? '60px' : '200px'">
        <main-menu :is-fold="isFold"></main-menu>
      </el-aside>
      <el-container>
        <el-header height="60px">
          <main-header @fold-change="onFoldChange"></main-header>
        </el-header>
        <el-main>
          <!-- 路由视图 -->
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts" name="main">
import MainMenu from '@/components/main-menu/main-menu.vue';
import MainHeader from '@/components/main-header/main-header.vue';
import { ref } from 'vue';

const isFold = ref(false);
function onFoldChange(fold: boolean) {
  isFold.value = fold;
}
</script>

<style scoped lang="less">
.main {
  height: 100%;
}

.main-content {
  height: 100%;

  .el-aside {
    overflow-x: hidden;
    overflow-y: auto;
    line-height: 200px;
    text-align: left;
    cursor: pointer;
    background-color: #001529;
    scrollbar-width: none; /* firefox */
    -ms-overflow-style: none;

    transition: width 0.3s ease;

    &::-webkit-scrollbar {
      display: none;
    }
  }

  .el-main {
    --el-main-padding: 10px;
    background-color: #f0f2f5;
  }
}
</style>
