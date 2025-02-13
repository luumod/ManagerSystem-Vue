<template>
  <div class="main-menu">
    <div class="logo">
      <img class="img" src="@/assets/img/logo.svg" />
      <h2 v-show="!isFold" class="title">图片管理系统</h2>
    </div>
    <div class="menu">
      <el-menu
        :collapse="isFold"
        :default-active="default_active"
        text-color="#b7bdc3"
        active-text-color="#fff"
        background-color="#001529"
      >
        <!-- 遍历整个菜单 -->
        <template v-for="item in user_menus" v-bind:key="item.id">
          <!-- 如果有children 就渲染子菜单 -->
          <el-sub-menu v-if="hasChildren(item)" :index="item.id + ''">
            <template #title>
              <el-icon>
                <component :is="item.icon.split('-icon-')[1]" />
              </el-icon>
              <span>{{ item.name }}</span>
            </template>
            <template v-for="subItem in item.children" :key="subItem.id">
              <el-menu-item :index="subItem.id + ''" @click="onClickedMenuItem(subItem)">{{
                subItem.name
              }}</el-menu-item>
            </template>
          </el-sub-menu>
          <!-- 如果没有children，则当前项就是el-menu-item -->
          <el-menu-item v-else :index="item.id + ''" @click="onClickedMenuItem(item)">
            <el-icon>
              <component :is="item.icon.split('-icon-')[1]" />
            </el-icon>
            <template #title>
              <span>{{ item.name }}</span>
            </template>
          </el-menu-item>
        </template>
      </el-menu>
    </div>
  </div>
</template>

<script setup lang="ts" name="main-menu">
import router from '@/router';
import useLoginStore from '@/store/login';
import { active_menu, mapPathToMenu } from '@/utils/map-menus';
import { computed } from 'vue';
import { useRoute } from 'vue-router';

//0. 接收父类传参
defineProps({
  isFold: {
    type: Boolean,
    default: false
  }
});

const loginStore = useLoginStore();
const user_menus = loginStore.user_menus;

//1. 检查是否有子菜单
function hasChildren(item: any): boolean {
  return item.children && item.children.length > 0;
}

//2. 点击菜单项--跳转页面
function onClickedMenuItem(item: any) {
  router.push(item.url);
}

//3. 监听路径变化，保持菜单的选中状态
const route = useRoute();
const default_active = computed(() => {
  mapPathToMenu(route.path, user_menus);
  return active_menu.id + '';
});
</script>

<style scoped lang="less">
.main-menu {
  height: 100%;
  background-color: #001529;
}

.logo {
  display: flex;
  height: 40px;
  padding: 5px 5px 5px 5px;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  overflow: hidden;

  .img {
    height: 100%;
    margin: 0 10px;
  }

  .title {
    font-size: 16px;
    font-weight: 700;
    color: white;
    white-space: nowrap;
  }
}

.el-menu {
  border-right: none;
  user-select: none;
}

.el-sub-menu {
  .el-menu-item {
    padding-left: 50px !important;
    background-color: #0c2135;
  }

  .el-menu-item:hover {
    color: #fff;
  }

  .el-menu-item.is-active {
    background-color: #195493ab;
  }
}
</style>
