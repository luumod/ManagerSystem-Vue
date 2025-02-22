<template>
  <div class="storage">
    <filter-image
      @changeOrderType="handleChangeOrderType"
      @changeOrderDirection="handleChangeOrderDirection"
      @reload="handleReload"
    ></filter-image>
    <content-image :image_list="imageList" @click-card="handleOpenImage"></content-image>

    <show-image ref="showImage"></show-image>
  </div>
</template>

<script setup lang="ts" name="storage">
import FilterImage from './c-cpns/filter-image.vue';
import ContentImage from './c-cpns/content-image.vue';
import ShowImage from './c-cpns/show-image.vue';
import useStorageStore from '@/store/storage/storage';
import { computed, onMounted, ref } from 'vue';
import { localCache } from '@/utils/cache';
import { LOGIN_TOKEN } from '@/global/constants';
import type { IFilterImageEmits } from '@/store/storage/types';
import { ElMessage } from 'element-plus';
import { BASE_URL } from '@/service/config';
import type { T_imageInfo } from '@/store/main/system/types';

const current_config = ref();
const showImage = ref<InstanceType<typeof ShowImage>>();
const storageStore = useStorageStore();
onMounted(() => {
  // 超过5分钟才重新请求
  if (Date.now() - storageStore.lastFetchTime > 300000) {
    storageStore.resetCache().getImageListAction({
      orderBy: 'default',
      orderDirection: ''
    });
  }
});

// 响应式数据
const imageList = computed(() => {
  const token = localCache.getCache(LOGIN_TOKEN);
  if (!token) {
    console.error('无法获取登录令牌');
    return [];
  }
  const image_list = storageStore.image_list;
  return image_list.map((item) => {
    return {
      ...item,
      image_path: `${BASE_URL}${item.image_path}?token=${token}&timestamp=${Date.now()}`
    };
  });
});

function handleChangeOrderType(config: IFilterImageEmits) {
  current_config.value = config;
  storageStore.resetCache().getImageListAction(config);
  ElMessage.success('排序成功');
}

function handleChangeOrderDirection(config: IFilterImageEmits) {
  current_config.value = config;
  storageStore.resetCache().getImageListAction(config);
  ElMessage.success('排序成功');
}

function handleReload() {
  storageStore.resetCache().getImageListAction(current_config.value);
  ElMessage.success('重新加载');
}

function handleOpenImage(item: T_imageInfo) {
  showImage.value?.openFullScreenDialog(item);
}
</script>

<style scoped>
.storage {
}
</style>
