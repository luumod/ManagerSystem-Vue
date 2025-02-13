<template>
  <div class="header-crumb">
    <el-breadcrumb separator-icon="ArrowRight">
      <template v-for="item in breadcrumbs" :key="item.name">
        <el-breadcrumb-item :to="item.path">
          {{ item.name }}
        </el-breadcrumb-item>
      </template>
    </el-breadcrumb>
  </div>
</template>

<script setup lang="ts" name="header-crumb">
import { computed } from 'vue';
import useLoginStore from '@/store/login';
import { mapPathToBreadcrumbs } from '@/utils/map-menus';
import { useRoute } from 'vue-router';


//1. 监听路径的变化，保持面包屑的路径同步
const route = useRoute();
const user_menus = useLoginStore().user_menus;
const breadcrumbs = computed(() => {
  return mapPathToBreadcrumbs(route.path, user_menus);
});
</script>

<style scoped>
.header-crumb {
  color: red;
}
</style>
