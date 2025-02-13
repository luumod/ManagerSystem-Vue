<template>
  <div class="user">
    <user-search> </user-search>
    <div class="content">
      <div class="header">头部</div>
      <div class="table">表格</div>
      <div class="pagination">分页</div>
    </div>
  </div>
</template>

<script setup lang="ts" name="user">
import UserSearch from './c-cpns/user_search.vue';
</script>

<style scoped lang="less">
.user {
  border-radius: 10px;
  overflow: hidden;
}
</style>
