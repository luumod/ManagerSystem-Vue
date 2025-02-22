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

/**
 * 首先从缓存中加载，如果没有或者超时则发送请求获取图片列表
 */
onMounted(() => {
  if (Date.now() - storageStore.lastFetchTime > 300000 || storageStore.image_list.length === 0) {
    storageStore.resetCache().getImageListAction({
      orderBy: 'default',
      orderDirection: ''
    });
  }
});

/**
 * 包装图片列表，把整理好后的数据传递给content-image组件
 */
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

/**
 * 排序类型改变:重新发送请求，获取所有图片
 * @param config 排序配置
 */
function handleChangeOrderType(config: IFilterImageEmits) {
  current_config.value = config;
  storageStore.resetCache().getImageListAction(config);
  ElMessage.success('排序成功');
}

/**
 * 排序方向改变:重新发送请求，获取所有图片
 * @param config 排序配置
 */
function handleChangeOrderDirection(config: IFilterImageEmits) {
  current_config.value = config;
  storageStore.resetCache().getImageListAction(config);
  ElMessage.success('排序成功');
}

/**
 * 手动点击重新加载的按钮
 */
function handleReload() {
  storageStore.resetCache().getImageListAction(current_config.value);
  ElMessage.success('重新加载');
}

/**
 * 点击一张图片，显示图片的详细信息的窗口
 * @param item 图片信息
 */
function handleOpenImage(item: T_imageInfo) {
  showImage.value?.openFullScreenDialog(item);
}
</script>

<style scoped></style>
