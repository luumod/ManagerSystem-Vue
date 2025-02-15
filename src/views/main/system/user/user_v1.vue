<template>
  <div class="user">
    <!-- 获取子组件的事件 -->
    <page-search
      :search-config="searchConfig"
      @search-click="onClickedSearch"
      @reset-click="onClickedReset"
    >
    </page-search>
    <page-content
      ref="contentRef"
      :content-config="contentConfig"
      @changePage="onChangePage"
      @changePageSize="onChangePageSize"
      @deleteUser-click="onClickedDelete"
      @batchDeleteUsers-click="onClickedBatchDelete"
      @createdNewUser-click="onClickedCreatedNewUser"
      @editUser-click="onClickedEditUser"
      @changeEnableUser-click="onClickedChanegeEnableUser"
    >
    </page-content>
    <user-modal ref="modalRef"> </user-modal>
    <user-modal-edit ref="modalEditRef"></user-modal-edit>
  </div>
</template>

<script setup lang="ts" name="user">
import contentConfig from './config/content.config';
import searchConfig from './config/search.config';
import PageSearch from '@/components/page-search/page-search.vue';
import PageContent from '@/components/page-content/page-content.vue';

import UserModal from './c-cpns/user-modal.vue';
import UserModalEdit from './c-cpns/user-modal-edit.vue';
import { ref } from 'vue';
import default_query_condition, {
  type T_queryUserData,
  type T_userInfo
} from '@/store/main/system/types';

// 获content实例对象
const contentRef = ref<InstanceType<typeof PageContent>>();
const modalEditRef = ref<InstanceType<typeof UserModalEdit>>();
const modalRef = ref<InstanceType<typeof UserModal>>();
//深拷贝：只拷贝浅层属性
let queryCondition = { ...default_query_condition };

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
  queryCondition = { ...default_query_condition };
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
 * @param id 用户id
 */
function onClickedDelete(id: number) {
  contentRef.value?.fetchDeleteUser(id, queryCondition);
}

/**
 * 点击批量删除按钮会发送请求，批量删除指定用户（可满足查询条件）
 * @param user_infos 用户信息数组
 */
function onClickedBatchDelete(user_infos: T_userInfo[]) {
  const ids = user_infos.map((item) => item.id); //获取删除用户的id
  contentRef.value?.fetchBatchDeleteUsers(ids, queryCondition);
}

/**
 * 点击状态图标，会改变用户的状态（启用/禁用）（可满足查询条件）
 * @param item_data 用户的全部信息
 */
function onClickedChanegeEnableUser(item_data: any) {
  contentRef.value?.fetchUpdateUser(item_data, queryCondition);
}

/**
 * 点击编辑按钮：显示编辑框，并将用户信息填充到编辑框中（可满足查询条件）
 * @param item_data 用户信息
 */
function onClickedEditUser(item_data: any) {
  modalEditRef.value?.showUpdateUserDlg(item_data, queryCondition);
}

/**
 * 点击新增按钮：显示新增用户的弹窗
 */
function onClickedCreatedNewUser() {
  modalRef.value?.setDlgVisible(true);
}
</script>

<style scoped lang="less">
.user {
  border-radius: 10px;
  overflow: hidden;
}
</style>
