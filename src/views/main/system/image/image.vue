<template>
  <div class="image">
    <page-search :search-config="searchConfig"></page-search>
    <page-content
      ref="contentRef"
      :content-config="contentConfig"
      @changePage="onChangePage"
      @changePageSize="onChangePageSize"
      @deleteUser-click="onClickedDelete"
      @batchDeleteUsers-click="onClickedBatchDelete"
    >
      <template v-slot:image_path="scope">
        <el-image
          style="width: 100px; height: 100px"
          :src="`${BASE_URL}${scope.row.image_path}`"
          fit="cover"
        >
          <template #error>
            <div class="image-slot">
              <el-icon><Close /></el-icon>
            </div>
          </template>
        </el-image>
      </template>
    </page-content>
  </div>
</template>

<script setup lang="ts" name="image">
import pageSearch from '@/components/page-search/page-search.vue';
import pageContent from '@/components/page-content/page-content.vue';

import contentConfig from './config/content.config';
import searchConfig from './config/search.config';
import usePageContent from '@/hooks/usePageContent';
import { BASE_URL } from '@/service/config';
import { ref } from 'vue';
import { default_queryImage_condition, type T_queryImageData } from '@/store/main/system/types';
//import usePageSearch from '@/hooks/usePageSearch';

const imageCondition = ref<T_queryImageData>({ ...default_queryImage_condition });
const {
  contentRef,
  // modalRef,
  // modalEditRef,
  //conditionRef,
  createPageChanger,
  createPageSizeChanger,
  createOnClickedDeleteChanger,
  createOnClickedBatchDeleteChanger
  // onClickedChanegeEnableUser,
  // onClickedEditUser,
  // onClickedCreatedNewUser
} = usePageContent(imageCondition);

const onChangePage = createPageChanger({
  condRef: imageCondition,
  fetchMethod: 'fetchImageListData'
});
const onChangePageSize = createPageSizeChanger({
  condRef: imageCondition,
  fetchMethod: 'fetchImageListData'
});
const onClickedDelete = createOnClickedDeleteChanger({
  condRef: imageCondition,
  fetchMethod: 'fetchDeleteImage'
});
const onClickedBatchDelete = createOnClickedBatchDeleteChanger({
  condRef: imageCondition,
  fetchMethod: 'fetchBatchDeleteImages'
});

//const { onClickedSearch, onClickedReset } = usePageSearch(contentRef, conditionRef);
</script>

<style scoped lang="less">
.image {
  .demo-image__error .image-slot {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    background: var(--el-fill-color-light);
    color: var(--el-text-color-secondary);
    font-size: 30px;
  }
}
</style>
