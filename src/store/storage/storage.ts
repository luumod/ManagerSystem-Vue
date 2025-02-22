import { getImageListData } from '@/service/storage/storage';
import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { T_imageInfo } from '../main/system/types';
import type { IFilterImageEmits } from './types';

const useStorageStore = defineStore(
  'storage',
  () => {
    const image_list = ref<T_imageInfo[]>([]);
    const lastFetchTime = ref(0);

    const sort = ref({
      idx: 0,
      dir: 0
    });

    const store = useStorageStore();

    /**
     * 清除缓存，可链式后接一个请求操作
     */
    function resetCache() {
      image_list.value = [];
      lastFetchTime.value = 0;

      return store;
    }

    /**
     * 检查是否有缓存
     */
    function cache() {
      return Date.now() - lastFetchTime.value < 300000 && image_list.value.length > 0;
    }

    /**
     * 获取图片列表
     * @param query_params 查询条件（排序类型与方向）
     */
    async function getImageListAction(query_params: IFilterImageEmits) {
      if (cache()) {
        return;
      }

      try {
        const response = await getImageListData(query_params);
        const { images } = response.data;
        image_list.value = images;
        lastFetchTime.value = Date.now();
      } catch (err: any) {
        throw err;
      }
    }

    return {
      image_list,
      lastFetchTime,
      sort,
      getImageListAction,
      resetCache
    };
  },
  {
    persist: {
      pick: ['image_list', 'lastFetchTime', 'sort'],
      storage: localStorage
    }
  }
);

export default useStorageStore;
