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
    <page-created ref="modalRef" :created-config="createdConfig"></page-created>
    <page-modalEdit ref="modalEditRef" :modal-edit-config="modalEditConfig"></page-modalEdit>
  </div>
</template>

<script setup lang="ts" name="user">
import contentConfig from './config/content.config';
import searchConfig from './config/search.config';
import modalEditConfig from './config/modalEdit.config';
import createdConfig from './config/created.config';
import PageSearch from '@/components/page-search/page-search.vue';
import PageContent from '@/components/page-content/page-content.vue';
import PageModalEdit from '@/components/page-edit/page-modalEdit.vue';
import PageCreated from '@/components/page-created/page-created.vue';

  import usePageSearch from '@/hooks/usePageSearch';
import usePageContent from '@/hooks/usePageContent';
import { default_query_condition, type T_queryUserData } from '@/store/main/system/types';
import { ref } from 'vue';

const userCondition = ref<T_queryUserData>({ ...default_query_condition });

const {
  contentRef,
  modalRef,
  modalEditRef,
  createPageChanger,
  createPageSizeChanger,
  createOnClickedDeleteChanger,
  createOnClickedBatchDeleteChanger,
  onClickedChanegeEnableUser,
  onClickedEditUser,
  onClickedCreatedNewUser
} = usePageContent(userCondition);

const onChangePage = createPageChanger({
  condRef: userCondition,
  fetchMethod: 'fetchUserListData'
});
const onChangePageSize = createPageSizeChanger({
  condRef: userCondition,
  fetchMethod: 'fetchUserListData'
});
const onClickedDelete = createOnClickedDeleteChanger({
  condRef: userCondition,
  fetchMethod: 'fetchDeleteUser'
});
const onClickedBatchDelete = createOnClickedBatchDeleteChanger({
  condRef: userCondition,
  fetchMethod: 'fetchBatchDeleteUsers'
});

const { onClickedSearch, onClickedReset } = usePageSearch(contentRef, userCondition);
</script>

<style scoped lang="less">
.user {
  border-radius: 10px;
  overflow: hidden;
}
</style>
