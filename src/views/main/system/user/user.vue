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
import usePageSearch from '@/hooks/usePageSearch';
import usePageContent from '@/hooks/usePageContent';

// 获content实例对象

const {
  contentRef,
  modalRef,
  modalEditRef,
  conditionRef,
  onChangePage,
  onChangePageSize,
  onClickedDelete,
  onClickedBatchDelete,
  onClickedChanegeEnableUser,
  onClickedEditUser,
  onClickedCreatedNewUser
} = usePageContent();

const { onClickedSearch, onClickedReset } = usePageSearch(contentRef, conditionRef);
</script>

<style scoped lang="less">
.user {
  border-radius: 10px;
  overflow: hidden;
}
</style>
