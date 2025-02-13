<template>
  <div class="user">
    <!-- 获取子组件的事件 -->
    <user-search @search-click="onClickedSearch" @reset-click="onClickedReset"> </user-search>
    <user-content
      ref="contentRef"
      @changePage="onChangePage"
      @changePageSize="onChangePageSize"
      @deleteUser-click="onClickedDelete"
    ></user-content>
  </div>
</template>

<script setup lang="ts" name="user">
import UserSearch from './c-cpns/user-search.vue';
import UserContent from './c-cpns/user-content.vue';
import { ref } from 'vue';
import default_query_condition, { type T_queryUserData } from '@/store/main/system/types';

// 获content实例对象
const contentRef = ref<InstanceType<typeof UserContent>>();
let queryCondition = default_query_condition;

/**
 * 点击查询按钮会发送请求，按用户自定义搜索条件查询用户列表
 * @param formData 用户搜索条件
 */
function onClickedSearch(formData: T_queryUserData) {
  //在content实例对象中调用fetchUserListData方法
  queryCondition = formData;
  contentRef.value?.fetchUserListData(formData);
}

/**
 * 点击重置按钮会发送请求，重置搜索条件，查询所有用户列表
 */
function onClickedReset() {
  contentRef.value?.fetchUserListData();
}

/**
 * 改变页码会发送请求，按新的页码查询用户列表（可满足查询条件）
 * @param page 页码
 */
function onChangePage(page: number) {
  queryCondition.page = page;
  contentRef.value?.fetchUserListData(queryCondition);
}

/**
 * 改变每页显示条数会发送请求，按新的每页显示条数查询用户列表（可满足查询条件）
 * @param pageSize 每页显示条数
 */
function onChangePageSize(pageSize: number) {
  queryCondition.pageSize = pageSize;
  contentRef.value?.fetchUserListData(queryCondition);
}

/**
 * 点击删除按钮会发送请求，删除指定用户（可满足查询条件）
 * @param user_account 用户账号
 */
function onClickedDelete(user_account: any) {
  contentRef.value?.fetchDeleteUser([user_account], queryCondition);
}
</script>

<style scoped lang="less">
.user {
  border-radius: 10px;
  overflow: hidden;
}
</style>
