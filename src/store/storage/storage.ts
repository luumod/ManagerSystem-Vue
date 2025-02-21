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

    function resetCache() {
      image_list.value = [];
      lastFetchTime.value = 0;

      return store;
    }

    function cache() {
      //不需要重新请求数据
      return Date.now() - lastFetchTime.value < 300000 && image_list.value.length > 0;
    }

    async function getImageListAction(query_params: IFilterImageEmits) {
      // 添加缓存有效期判断（例如5分钟）
      if (cache()) {
        return;
      }

      console.log('getImageListAction');
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
