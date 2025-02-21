<template>
  <div class="storage">
    <filter-image
      @changeOrderType="handleChangeOrderType"
      @changeOrderDirection="handleChangeOrderDirection"
    ></filter-image>
    <content-image :imageList="imageList"></content-image>
  </div>
</template>

<script setup lang="ts" name="storage">
import FilterImage from './c-cpns/filter-image.vue';
import ContentImage from './c-cpns/content-image.vue';
import type { T_imageInfo } from '@/store/main/system/types';
import useStorageStore from '@/store/storage/storage';
import { computed } from 'vue';
import { localCache } from '@/utils/cache';
import { LOGIN_TOKEN } from '@/global/constants';
import { BASE_URL } from '@/service/config';

const storageStore = useStorageStore();
storageStore.getImageListAction({
  orderBy: 'default',
  orderDirection: ''
});

interface IWaterfallItem {
  src: string;
  info: T_imageInfo;
}

// 响应式数据
const imageList = computed(() => {
  console.log('自动更新：imageList', storageStore.image_list);
  const image_list = storageStore.image_list;
  const token = localCache.getCache(LOGIN_TOKEN);
  if (!token) {
    console.error('无法获取登录令牌');
    return [];
  }

  return image_list.map(
    (item): IWaterfallItem => ({
      src: `${BASE_URL}${item.image_path}?token=${token}&t=${Date.now()}`,
      info: item
    })
  );
});

interface IFilterImageEmits {
  orderBy: string;
  orderDirection: string;
}

function handleChangeOrderType(config: IFilterImageEmits) {
  storageStore.getImageListAction(config);
}

function handleChangeOrderDirection(config: IFilterImageEmits) {
  storageStore.getImageListAction(config);
}
</script>

<style scoped>
.storage {
}
</style>
